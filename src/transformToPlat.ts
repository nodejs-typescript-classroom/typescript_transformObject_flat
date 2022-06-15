export interface keyValue{
  [key:string]: any
}
export interface keyStringValue {
  [key:string]: string
}
export const transformObject  = (input: keyValue, prefix: string, result: keyStringValue) => {
  const keys: string[] = Object.keys(input);
  const kLen = keys.length;
  for (let idx = 0; idx < kLen; idx++) {
    const key = keys[idx];
    const inputKey:string = (prefix !== "")? `${prefix}.${key}`:`${key}`; 
    if (typeof input[key] != "string") {
      transformObject(input[key],`${inputKey}`, result)
    } else {
      result[`${inputKey}`] = input[key];
    }
  }
}
