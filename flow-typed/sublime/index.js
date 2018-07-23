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
  a: (?number) => Promise<?number>,
  b: (?number) => Promise<?number>,
  xpos: (?number) => Promise<?number>,
  begin: () => Promise<number>,
  end: () => Promise<number>,
  size: () => Promise<number>,
  empty: () => Promise<boolean>
}

type View = JSMappedVariable & {
}

type Settings = JSMappedVariable & {
}

type Window = JSMappedVariable & {
}

type Sheet = JSMappedVariable & {
}

type Phantom = JSMappedVariable & {
}

type PhantomSet = JSMappedVariable & {
}

type StepObject = {
  cb: (any, any) => void
}