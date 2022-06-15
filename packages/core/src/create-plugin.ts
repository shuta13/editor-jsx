import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { createElement, Fragment } from "./create-element";
import { VNode } from "./types";
import { isEditorJSVNode, update } from "./parser";

const walkNodes = (vNode: VNode, parentDom?: HTMLElement) => {
  // for FunctionComponent
  if (typeof vNode.type === "function") {
    const childlen = vNode.type(vNode.props);
    if (Array.isArray(childlen)) {
      for (const v of childlen) {
        walkNodes(v);
      }
    } else if (childlen != null) {
      walkNodes(childlen);
    } else {
      return null;
    }
  } else if (typeof vNode.type === "string" && isEditorJSVNode(vNode.type)) {
    // for EditorJSXComponent
    const { children, ...params } = vNode.props;

    children?.forEach((child: VNode) => {
      walkNodes(child);
    });

    // apply params for creating EditorJS Class

    console.log(vNode);
  } else if (typeof vNode.type === "string") {
    // for HTMLElementComponent
    const element = document.createElement(vNode.type);
    const { children, ...eventHandlers } = vNode.props;

    // check children type
    children?.forEach((child: string | VNode) => {
      if (typeof child === "string") {
        element.innerText = child;
      } else {
        walkNodes(child);
      }
    });

    // attach event handler
    for (const [k, v] of Object.entries(eventHandlers)) {
      element.setAttribute(k.toLowerCase(), v);
    }

    vNode.dom = element;
    // append dom
  }
};

/**
 * @description Remove `replaceNode` from params because of using this directory as API
 */
export const createTool = (
  vNode: VNode,
  parentDom: unknown
): ToolConstructable => {
  // TODO: create Editor.js plugin class as vnode
  const initialVNode = createElement(Fragment, null, vNode);

  // TODO: diff & commit
  walkNodes(initialVNode);
  // if (typeof initialVNode.type === "function") {
  //   const VNodes = initialVNode.type(initialVNode.props) as unknown as VNode[];
  //   VNodes?.forEach((v) => {
  //     if (typeof v.type === "function") {
  //       console.log(v.type(v.props));
  //     }
  //   });
  // }

  // TODO: fix output
  return class {
    constructor() {}
    suround() {}
    save() {}
    render() {
      return document.createElement("div");
    }
  };
};
