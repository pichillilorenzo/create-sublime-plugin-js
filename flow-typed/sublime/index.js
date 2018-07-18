// @flow

type PythonError = {
  message: string,
  type: string,
  code: number
}

type MappedVariable = {
  var: string,
  mapTo: string,
  code: string,
  value: any,
  error: PythonError
}

type JSMappedVariable = {
  self: MappedVariable
}

type Region = JSMappedVariable & {
  a: (StepObject, ?number) => Promise<>,
  b: (StepObject, ?number) => Promise<>,
  xpos: (StepObject, ?number) => Promise<>
}

type View = JSMappedVariable & {
}

type StepObject = {
  cb: (any, any) => void
}