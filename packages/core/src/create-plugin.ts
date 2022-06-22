import type { ToolConstructable } from "@editorjs/editorjs";
import { createElement, Fragment } from "./create-element";
import { Props, VNode } from "./types";
import { pluginMethodPrefixes } from "./constants";
import { hasOwnProperty, isWhiteSpace, isEditorJSVNode } from "./helpers";
// import type { UnionToIntersection } from "type-fest";
// import { isObjectFactory } from "./helpers";

const traverseNodes = (vNode: VNode, parent?: VNode): VNode | null => {
  if (hasOwnProperty(vNode, "parent") && parent) {
    vNode.parent = parent;
  }
  if (typeof vNode.type === "function") {
    const childlen = vNode.type(vNode.props);
    if (Array.isArray(childlen)) {
      for (const v of childlen) {
        return traverseNodes(v, vNode);
      }
    } else if (childlen != null) {
      return traverseNodes(childlen, vNode);
    } else {
      return null;
    }
  } else if (typeof vNode.type === "string" && isEditorJSVNode(vNode.type)) {
    const { children, ...pluginProps } = vNode.props;

    for (const child of children) {
      traverseNodes(child, vNode);
    }

    vNode.isRoot = true;
    vNode.children = children.filter((child: VNode) =>
      hasOwnProperty(child, "type")
    );
    vNode.pluginProps = pluginProps;
    vNode.parent = null;

    return vNode;
  } else if (typeof vNode.type === "string") {
    // for HTMLElement
    const element = document.createElement(vNode.type);
    const { children, ...eventHandlers } = vNode.props;

    // check children type
    for (const child of children) {
      if (typeof child === "string" && !isWhiteSpace(child)) {
        const textVNode: VNode = {
          type: "text",
          key: undefined,
          ref: undefined,
          props: {} as unknown as Props,
          dom: document.createTextNode(child),
          original: null,
          children: null,
          component: null,
          constructor: Object.prototype.constructor,
          depth: 0,
          isRoot: false,
          hydrating: null,
          nextDom: null,
          pluginProps: null,
          parent: vNode,
        };
        if (vNode.children === null) {
          vNode.children = [textVNode];
        } else {
          vNode.children = [...vNode.children, textVNode];
        }
      } else {
        vNode.children = children.filter((child: VNode) =>
          hasOwnProperty(child, "type")
        );
        traverseNodes(child, vNode);
      }
    }

    // attach event handler
    for (const [k, v] of Object.entries(eventHandlers)) {
      // @ts-expect-error
      element[k.toLowerCase()] = v;
    }

    vNode.dom = element;
    // append dom
    return vNode;
  }
  return vNode;
};

const createNodes = (vNode: VNode): VNode => {
  if (vNode.parent) {
    const parentDom = vNode.parent.dom;
    parentDom?.appendChild(vNode.dom);
    vNode.parent.dom = parentDom;
  }
  if (vNode.children) {
    for (const child of vNode.children) {
      createNodes(child);
    }
  }

  return vNode;
};

const mapPluginProps = (
  pluginProps: NonNullable<VNode["pluginProps"]>,
  domTree: HTMLElement
) => {
  const { STATIC_GETTER, STATIC_METHOD } = pluginMethodPrefixes;
  class Plugin {
    render() {
      return domTree;
    }
  }

  for (const [k, v] of Object.entries(pluginProps)) {
    if (k.startsWith(STATIC_GETTER)) {
      const key = k.replace(STATIC_GETTER, "");
      Plugin[key as keyof typeof Plugin] = v;
    } else if (k.startsWith(STATIC_METHOD)) {
      const key = k.replace(STATIC_METHOD, "");
      Plugin[key as keyof typeof Plugin] = v;
    } else {
      // @ts-expect-error
      Plugin.prototype[k] = v;
    }
  }

  return Plugin as unknown as ToolConstructable;
};

const createDomTree = (vNode: VNode) => {
  // NOTE: create DOM node
  let domTree: HTMLElement | null = null;
  const nodes = createNodes(vNode);
  if (
    isEditorJSVNode(nodes.type as string) &&
    nodes.isRoot &&
    nodes.children?.length === 1
  ) {
    for (const node of nodes.children) {
      domTree = node.dom as HTMLElement;
    }
    return domTree;
  }
  // else if (nodes.isRoot && nodes.children?.length === 1) {
  //   console.log("nodes", nodes.dom);
  //   return nodes.dom as HTMLElement;
  // }
  else {
    throw new Error();
  }
};

// TODO: JSX as props
// const transformPluginProps = (
//   pluginProps: NonNullable<VNode["pluginProps"]>
// ): NonNullable<VNode["pluginProps"]> => {
//   for (const [k, v] of Object.entries(pluginProps)) {
//     // NOTE: Check poperty object
//     const { isObject, isEmptyObject } = isObjectFactory(v);
//     if (isObject && !isEmptyObject) {
//       if (hasOwnProperty(v, "type")) {
//         const nodes = traverseNodes(v);
//         if (nodes !== null) {
//           // NOTE: This nodes doesn't have Editor.js native JSX Element, so add `isRoot: true` manually
//           nodes.isRoot = true;
//           const domTree = createDomTree(nodes);
//           // @ts-expect-error
//           pluginProps[k] = domTree;
//         }
//       } else {
//         return transformPluginProps(v);
//       }
//     }
//   }
//   return pluginProps;
// };

/**
 * @description Remove `replaceNode` from params because of using this directory as API
 */
export const createTool = (vNode: VNode): ToolConstructable => {
  const initialVNode = createElement(Fragment, null, vNode);

  const nodes = traverseNodes(initialVNode);
  // TODO: diff & commit

  if (nodes?.pluginProps != null) {
    // transformPluginProps(nodes?.pluginProps);

    const domTree = createDomTree(nodes);
    if (domTree !== null) {
      return mapPluginProps(nodes.pluginProps, domTree);
    } else {
      return class {} as unknown as ToolConstructable;
    }
  } else {
    return class {} as unknown as ToolConstructable;
  }
};
