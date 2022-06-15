import { VNode } from "./types";
import { EMPTY_V_NODE, EditorJSXVNodeType } from "./constants";

export const isEditorJSVNode = (
  type: EditorJSXVNodeType | string
): type is EditorJSXVNodeType => {
  return Object.prototype.hasOwnProperty.call(EMPTY_V_NODE, type);
};

const createTextElement = (text: string) => {
  const isValidText = !new RegExp(/^(\s|\n)$/).test(text);
  if (isValidText) {
    return text;
    // return document.createTextNode(text);
  } else {
    return createTextElement.name;
  }
};

const createHTMLElement = (vNode: VNode) => {
  return vNode.type as keyof HTMLElementTagNameMap;
  // return document.createElement(vNode.type as keyof HTMLElementTagNameMap);
};

const createEditorJSClass = (vNode: VNode) => {
  return createEditorJSClass.name;
};

const parser = (vNode: VNode | string) => {
  if (typeof vNode === "string") {
    return createTextElement(vNode);
  } else if (typeof vNode.type === "string") {
    if (isEditorJSVNode(vNode.type)) {
      return createEditorJSClass(vNode);
    } else {
      return createHTMLElement(vNode);
    }
  } else {
    return vNode;
  }
};

const traverser = (vNode: VNode | VNode[]) => {
  if (Array.isArray(vNode)) {
    for (const v of vNode) {
      traverser(v);
      return parser(v);
    }
  } else {
    // if (vNode.children != null) {
    //   for (const v of vNode.children) {
    //     traverser(v);
    //     return parser(v);
    //   }
    // } else if (typeof vNode.type === "function") {
    //   const newVNode = vNode.type(vNode.props);
    //   if (newVNode !== null) {
    //     traverser(newVNode);
    //     return parser(newVNode);
    //   }
    // } else if (typeof vNode.type === "string") {
    //   const children = vNode.props.children;
    //   for (const v of children) {
    //     traverser(v);
    //     return parser(v);
    //   }
    // } else {
    //   return parser(vNode);
    // }
    // return parser(vNode);
  }
};

export const update = (vNode: VNode) => {
  return traverser(vNode);
};
