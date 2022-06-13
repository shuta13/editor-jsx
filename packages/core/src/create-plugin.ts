import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { createElement, Fragment } from "./create-element";
import { VNode } from "./types";

/**
 * @description Remove `replaceNode` from params because of using this directory as API
 */
export const createTool = (
  vNode: VNode,
  parentDom: unknown
): ToolConstructable => {
  // TODO: create Editor.js plugin class as vnode
  const init = createElement(Fragment, null, [vNode]);
  console.log(
    "render: ",
    { init }
    // init.props.children[0].type(init.props.children[0].props)
  );

  // TODO: diff & commit

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
