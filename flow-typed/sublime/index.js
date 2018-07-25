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

type SublimeObject = {
  self: MappedVariable | null,
  codeChainString: string,
  codeChainString: string,
  stepRequired: boolean,
  +wrapMethod: ({complete: string, pre: string, after: string}, Function, Function, boolean) => Promise<any> | any,
  +isNull: (?StepObject) => Promise<boolean>,
  +checkStep: (?StepObject) => void,
  +getMapToCode: () => string,
  +getPythonCode: () => string
}

type Region = SublimeObject & {
  +a: (?number) => Promise<?number>,
  +b: (?number) => Promise<?number>,
  +xpos: (?number) => Promise<?number>,
  +begin: () => Promise<number>,
  +end: () => Promise<number>,
  +size: () => Promise<number>,
  +empty: () => Promise<boolean>
}

type View = SublimeObject & {
  +id: (?StepObject) => Promise<number>
}

type Edit = SublimeObject & {
}

type Settings = SublimeObject & {
}

type Window = SublimeObject & {
  +active_view: (?StepObject) => Promise<View> | View
}

type Sheet = SublimeObject & {
}

type Phantom = SublimeObject & {
}

type PhantomSet = SublimeObject & {
}

type StepObject = {
  cb: (any, any) => void
}