# typescript_transformObject_flat


題目： 把 Nested Key JSON 轉換成只有 key: value 這樣的形式

```json
{
  "container": {
    "name": "container_api_server",
    "ip": "127.0.0.1",
    "port": "3000"
  },
  "resource": "stream",
  "log": {
    "level": "error",
    "format": "json"
  },
  "error": {
    "message": "authentication fail",
    "type": "custom",
    "stack": {
      "source": "src/middle/auth/index.ts",
      "message": "Not Authentication"
    },
    "exception": {
      "type": "AuthenticationException",
      "root": {
        "type": "HttpException"
      }
    }
  },
  "httpStatusCod": "400",
  "status": "health"
}
```

轉換成
```json
{
  "container.name": "container_api_server",
  "container.ip": "127.0.0.1",
  "container.port": "3000",
  "resource": "stream",
  "log.level": "error",
  "log.format": "json",
  "error.message": "authentication fail",
  "error.type": "custom",
  "error.stack.source": "src/middle/auth/index.ts",
  "error.stack.message": "Not Authentication",
  "error.exception.type": "AuthenticationException",
  "error.exception.root.type": "HttpException",
  "httpStatusCod": "400",
  "status": "health"
}
```

這邊簡化 log entry 都是 string 

## 卡住的點

如何判斷是否該往下展開

在面試時原本使用 Object.keys(input[key]) 來做判斷

但會發現 如果是一般非空 object 還是會有 key 0

所以其實判斷的方式可以只要判斷這個 typeof input[key] 是不是 'string' 即可

因為如果是值則一定是 string 否則就是另一個 key-value

所以解法如下:
```typescript
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
    // 計算要展開的 key
    const inputKey:string = (prefix !== "")? `${prefix}.${key}`:`${key}`; 
    if (typeof input[key] != "string") { // 如果不是值，就要繼續展開
      transformObject(input[key],`${inputKey}`, result)
    } else { // 如果是值，就直接複製
      result[`${inputKey}`] = input[key];
    }
  }
}
```