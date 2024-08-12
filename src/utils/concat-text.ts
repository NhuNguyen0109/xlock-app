// vector::salt::enc_pri

export const storeConcatStr = (concatStr: string): void => {
  localStorage.setItem("concatStr", concatStr);
};

export const getConcatStr = (): string => {
  return localStorage.getItem("concatStr") ?? "";
};
