export const storeConcatStr = (concatStr: string): void => {
  sessionStorage.setItem("concatStr", concatStr);
};

export const getConcatStr = (): string => {
  return sessionStorage.getItem("concatStr") ?? "";
};
