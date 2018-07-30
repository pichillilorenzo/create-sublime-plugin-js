import socketserver
import subprocess
import threading
import os
import codecs

from . import global_vars

class ThreadedHTTPServer(object):
  def __init__(self, handler):
    self.server = socketserver.TCPServer(('', 0), handler)
    self.nodeServer = None

    with open(os.path.join(global_vars.PACKAGE_PATH, 'sublime_port.txt'), 'w+') as file:
      file.write(str(self.server.socket.getsockname()[1]))

    self.server_thread = threading.Thread(target=self.server.serve_forever)
    self.server_thread.daemon = True

  def start(self):
    self.server_thread.start()
    threading.Thread(target=self.startNodeServer, daemon=True).start()

  def stop(self):
    if self.nodeServer and not self.nodeServer.poll():
      try:
        self.nodeServer.terminate()
      except Exception as e:
        pass    
    self.nodeServer = None
    
    if self.server:
      self.server.shutdown()
      self.server.server_close()
    self.server = None

  def startNodeServer(self):

    self.nodeServer = subprocess.Popen([global_vars.NODE_PATH, global_vars.NODE_SERVER_PATH], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    nodePort = codecs.decode(self.nodeServer.stdout.readline(), "utf-8", "ignore").strip()
    if not nodePort.isdigit():
      print('ERROR: Wrong Node Server port')
      print(nodePort)
      for line in self.nodeServer.stdout:
        line = codecs.decode(line, "utf-8", "ignore").replace("\n", "")
        print(line)
      print('Shutting down the JSONRPC Server...')
      self.stop()
      return
    global_vars.URL_NODE_SERVER = "http://localhost:" + nodePort + "/jsonrpc"
    print(global_vars.PACKAGE_NAME + ": Node server started at " + global_vars.URL_NODE_SERVER)

    while self.nodeServer and not self.nodeServer.poll():
      line = self.nodeServer.stdout.readline()
      line = global_vars.PACKAGE_NAME + " Node server: " + codecs.decode(line, "utf-8", "ignore").replace("\n", "")
      print(line)
    
    