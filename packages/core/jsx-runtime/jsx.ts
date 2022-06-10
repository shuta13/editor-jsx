const createNode = (
  type: string,
  config: { [key: string]: any },
  children: { [key: string]: any }
) => {
  console.log(type, config, children);
};

export { createNode as jsx };
