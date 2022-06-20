import { ToolConstructable } from "@editorjs/editorjs";
import { createElement, Fragment } from "./create-element";
import { Props, VNode } from "./types";
import { isEditorJSVNode } from "./parser";

const pluginMethodPrefixes = {
  STATIC_GETTER: "static_get_",
  STATIC_METHOD: "static_",
} as const;

const isWhiteSpace = (str: string) => str === " ";
const hasOwnProperty = <T = {}>(thisArg: T, key: keyof T) =>
  Object.prototype.hasOwnProperty.call(thisArg, key);

const walkNodes = (vNode: VNode, parent?: VNode): VNode | null => {
  if (hasOwnProperty(vNode, "parent") && parent) {
    vNode.parent = parent;
  }
  if (typeof vNode.type === "function") {
    const childlen = vNode.type(vNode.props);
    if (Array.isArray(childlen)) {
      for (const v of childlen) {
        return walkNodes(v, vNode);
      }
    } else if (childlen != null) {
      return walkNodes(childlen, vNode);
    } else {
      return null;
    }
  } else if (typeof vNode.type === "string" && isEditorJSVNode(vNode.type)) {
    const { children, ...pluginProps } = vNode.props;

    for (const child of children) {
      walkNodes(child, vNode);
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
        walkNodes(child, vNode);
      }
    }

    // attach event handler
    for (const [k, v] of Object.entries(eventHandlers)) {
      element.setAttribute(k.toLowerCase(), v);
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
      // @ts-ignore
      Plugin.prototype[k] = v;
    }
  }

  return Plugin as unknown as ToolConstructable;
};

const normalize = (vNode: VNode) => {
  // NOTE: create DOM node
  let domTree: HTMLElement | null = null;
  const nodes = createNodes(vNode);
  if (nodes.isRoot && nodes.children?.length === 1) {
    for (const node of nodes.children) {
      domTree = node.dom as HTMLElement;
    }
  } else {
    throw new Error();
  }

  // NOTE: map pluginProps to instance
  if (vNode.pluginProps && domTree) {
    return mapPluginProps(vNode.pluginProps, domTree);
  } else {
    throw new Error();
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
  const nodes = walkNodes(initialVNode);

  if (nodes !== null) {
    return normalize(nodes);
  } else {
    return class {} as unknown as ToolConstructable;
  }
};
