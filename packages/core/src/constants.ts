import { EditorJSX } from "./types";

export type EditorJSXVNodeType = keyof EditorJSX.EditorJSToolElements;

export const EMPTY_V_NODE: {
  [K in EditorJSXVNodeType]: null;
} = {
  tool: null,
  inlineTool: null,
  blockTune: null,
} as const;
