import { EMPTY_V_NODE, EditorJSXVNodeType } from "./constants";

export const isWhiteSpace = (str: string) => str === " ";
export const hasOwnProperty = <T = {}>(thisArg: T, key: keyof T) =>
  Object.prototype.hasOwnProperty.call(thisArg, key);

export const isEditorJSVNode = (
  type: EditorJSXVNodeType | string
): type is EditorJSXVNodeType => {
  return hasOwnProperty(EMPTY_V_NODE, type as EditorJSXVNodeType);
};
