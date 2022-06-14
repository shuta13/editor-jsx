import { VNode } from "./types";

const parse = (vNode: VNode) => {
  console.log(vNode);
};

const traverse = (vNode: VNode | VNode[]) => {
  if (Array.isArray(vNode)) {
    vNode.forEach((v) => {
      traverse(v);
    });
  } else {
    if (vNode.children != null) {
      vNode.children.forEach((v) => {
        traverse(v);
      });
    }

    if (typeof vNode.type === "function") {
      const newVNode = vNode.type(vNode.props);
      if (newVNode !== null) {
        traverse(newVNode);
      }
    } else if (typeof vNode.type === "string") {
      const children = vNode.props.children;
      children.forEach((v: VNode) => {
        traverse(v);
      });
    }
    parse(vNode);
  }
};

export const update = (vNode: VNode) => {
  traverse(vNode);
};
