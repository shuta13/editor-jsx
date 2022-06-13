export type ComponentClass<P = {}, _S = {}> = {
  new (props: P, context?: unknown): unknown;
  displayName?: string;
  defaultProps?: Partial<P>;
};
export type FunctionComponent<P = {}> = {
  (props: P, context?: unknown): VNode | null;
  displayName?: string;
  defaultProps?: Partial<P>;
};
export type ComponentType<P = {}> = FunctionComponent<P>;

export type Props = {
  children?: any;
} & {
  [key: string]: any;
};
export type Key = string | number;

type RefObject<T> = { current: T | null };
type RefCallback<T> = { (instance: T): void; current: undefined };
export type Ref<T = { [key: string]: any }> = RefObject<T> | RefCallback<T>;

export type VNodeProps<P = {}> = {
  type: string | ComponentType<P>;
  props: Props;
  key: Key | undefined;
  ref: Ref | undefined;
  original: Original;
};
export type VNode<P = {}> = VNodeProps<P> & {
  children: Array<VNode> | null;
  parent: VNode | null;
  depth: number | null;
  dom: { [key: string]: any } | null;
  nextDom: { [key: string]: any } | null;
  component: { [key: string]: any } | null;
  hydrating: boolean | null;
  constructor: typeof Object.prototype.constructor;
};

export type Original = VNode | string | number | null;
