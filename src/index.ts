import { transformObject, keyStringValue, keyValue } from "./transformToPlat";


let result: keyStringValue = {}
let input: keyValue = {
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
transformObject(input, "", result)
console.log(result);