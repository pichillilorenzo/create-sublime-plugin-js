import threading
import socketserver
import http
import requests
import traceback
import json, logging
from jsonrpc import JSONRPCResponseManager, dispatcher
import inspect
import uuid
import sublime, sublime_plugin
import pickle
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

variable_mapping = {}

url = "http://localhost:3001/jsonrpc"
headers = {'content-type': 'application/json'}

def evalCode(code, save=True, globals=None, locals=None):
    global variable_mapping

    result_var_name = ""
    result = None
    error = None

    try:
        result = eval(code, globals, locals)
    except SyntaxError as e:
        try:
            exec(code, globals, locals)
        except Exception as err:
            traceback.print_exc()
            error = {
                "message": err.message if hasattr(err, "message") else str(err),
                "code": err.errno if hasattr(err, "errno") else None,
                "type": type(err).__name__
            }
    except Exception as err:
        print(code)
        traceback.print_exc()
        error = {
            "message": err.message if hasattr(err, "message") else str(err),
            "code": err.errno if hasattr(err, "errno") else None,
            "type": type(err).__name__
        }

    if save:
        result_var_name = str(uuid.uuid4())
        variable_mapping[result_var_name] = result

    return {
        "var": "",
        "mapTo": result_var_name,
        "code": code,
        "value": json.loads(json.dumps(result, cls=ObjectEncoder)),
        "error": error
    }

def tryCommand(callback):
    result = None
    error = None

    try:
        result = callback()
    except Exception as err:
        traceback.print_exc()
        error = {
            "message": err.message if hasattr(err, "message") else str(err),
            "code": err.errno if hasattr(err, "errno") else None,
            "type": type(err).__name__
        }

    return {
        "var": "",
        "mapTo": "",
        "code": "",
        "value": json.loads(json.dumps(result, cls=ObjectEncoder)),
        "error": error
    }

def freeMemory(vars_mapped):
    global variable_mapping
    print(variable_mapping)
    for var_mapped in vars_mapped:
        if "mapTo" in var_mapped and var_mapped["mapTo"]:
            del variable_mapping[var_mapped["mapTo"]]
        elif "self" in var_mapped and var_mapped["self"]["mapTo"]:
            del variable_mapping[var_mapped["self"]["mapTo"]]
    print(variable_mapping)

def timeout(port):

    variable_created = []

    payload = {
        "method": "timeout",
        "params": [],
        "jsonrpc": "2.0",
        "id": 0,
    }

    response = requests.post("http://localhost:" + str(port) + "/jsonrpc", data=json.dumps(payload), headers=headers).json()

    while "result" in response and not "end_cb_step" in response["result"]:

        result = evalCode(response["result"]["eval"], response["result"]["save"])
        variable_created.append(result)

        payload = {
            "method": "step",
            "params": [result],
            "jsonrpc": "2.0",
            "id": 0,
        }

        response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload), headers=headers).json()
    
    if "error" in response:
        print(response)

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_POST(self): 

        global variable_mapping

        content_length = int(self.headers['Content-Length']) # Gets the size of data
        post_data = self.rfile.read(content_length) # Gets the data itself

        self._set_response()
    
        # sublime methods
        dispatcher["set_timeout"] = lambda port, delay: tryCommand(lambda: sublime.set_timeout(lambda: timeout(port), delay))
        dispatcher["set_timeout_async"] = lambda port, delay: tryCommand(lambda: sublime.set_timeout_async(lambda: timeout(port), delay))
        dispatcher["error_message"] = lambda string: tryCommand(lambda: sublime.error_message(string))
        dispatcher["message_dialog"] = lambda string: tryCommand(lambda: sublime.message_dialog(string))
        dispatcher["ok_cancel_dialog"] = lambda string, ok_title: tryCommand(lambda: sublime.ok_cancel_dialog(string, ok_title))
        dispatcher["yes_no_cancel_dialog"] = lambda string, yes_title, no_title: tryCommand(lambda: sublime.yes_no_cancel_dialog(string, yes_title, no_title))
        dispatcher["load_resource"] = lambda name: tryCommand(lambda: sublime.load_resource(name))
        dispatcher["load_binary_resource"] = lambda name: tryCommand(lambda: sublime.load_binary_resource(name).decode('utf-8'))
        dispatcher["find_resources"] = lambda pattern: tryCommand(lambda: sublime.find_resources(pattern))
        dispatcher["encode_value"] = lambda value, pretty: tryCommand(lambda: sublime.encode_value(value, pretty))
        dispatcher["decode_value"] = lambda string: tryCommand(lambda: sublime.decode_value(string))
        dispatcher["expand_variables"] = lambda value, variables: tryCommand(lambda: sublime.expand_variables(value, variables))

        # sublime utils
        dispatcher["freeMemory"] = freeMemory
        dispatcher["evalCode"] = lambda code, save: evalCode(code, save)

        response = JSONRPCResponseManager.handle(post_data, dispatcher)

        try:
            self.wfile.write(response.json.encode('utf-8'))
        except TypeError as e:
            # decode
            self.wfile.write(response.json.decode('utf-8'))

    def log_message(self, format, *args):
        return


class ThreadedHTTPServer(object):
    def __init__(self, host, port, handler):
        self.server = socketserver.TCPServer((host, port), handler)
        self.server_thread = threading.Thread(target=self.server.serve_forever)
        self.server_thread.daemon = True

    def start(self):
        self.server_thread.start()

    def stop(self):
        self.server.shutdown()
        self.server.server_close()

class ObjectEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, "to_json"):
            return self.default(obj.to_json())
        elif hasattr(obj, "__dict__"):
            d = dict(
                (key, value)
                for key, value in inspect.getmembers(obj)
                if not key.startswith("__")
                and not inspect.isabstract(value)
                and not inspect.isbuiltin(value)
                and not inspect.isfunction(value)
                and not inspect.isgenerator(value)
                and not inspect.isgeneratorfunction(value)
                and not inspect.ismethod(value)
                and not inspect.ismethoddescriptor(value)
                and not inspect.isroutine(value)
            )
            return self.default(d)
        elif type(obj) is sublime.Region:
            return self.default(tuple(obj))
        return obj

class testCommand(sublime_plugin.TextCommand):
    def run(self, edit, **args):
        global variable_mapping

        self_var_name = str(uuid.uuid4())
        variable_mapping[self_var_name] = self

        variable_created = []

        self_var_map = {
            "var": "self",
            "mapTo": self_var_name,
            "code": "",
            "value": json.loads(json.dumps(self, cls=ObjectEncoder))
        }

        edit_var_name = str(uuid.uuid4())
        variable_mapping[edit_var_name] = edit

        edit_var_map = {
            "var": "edit",
            "mapTo": edit_var_name,
            "code": "",
            "value": json.loads(json.dumps(edit, cls=ObjectEncoder))
        }

        args_var_name = str(uuid.uuid4())
        variable_mapping[args_var_name] = args

        args_var_map = {
            "var": "args",
            "mapTo": args_var_name,
            "code": "",
            "value": json.loads(json.dumps(args, cls=ObjectEncoder))
        }

        payload = {
            "method": "testCommand",
            "params": [self_var_map, edit_var_map, args_var_map],
            "jsonrpc": "2.0",
            "id": 0,
        }

        response = requests.post(url, data=json.dumps(payload), headers=headers).json()

        variable_created += [self_var_map, edit_var_map, args_var_map]

        while "result" in response and not "end_cb_step" in response["result"]:

            result = evalCode(response["result"]["eval"], response["result"]["save"], locals = {"variable_created": variable_created})
            variable_created.append(result)

            payload = {
                "method": "step",
                "params": [result],
                "jsonrpc": "2.0",
                "id": 0,
            }

            response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload), headers=headers).json()
        
        if "error" in response:
            print(response)

def plugin_unloaded():
    global server
    if server:
        server.stop()

server = None

def plugin_loaded():
    global server
    # Start the threaded server
    server = ThreadedHTTPServer("localhost", 9200, S)
    server.start()
