import { keyStringValue, transformObject } from "./transformToPlat";

describe('transformToPlat', ()=>{
  test('example1', () => {
    const input = {
      "container": "name1",
      "object": "obj",
      "test": {
        "a": "a",
        "b": "b",
        "c": {
          "d": "d"
        }
      }
    };
    const result: keyStringValue = {}
    transformObject(input, "", result)
    expect(result).toEqual({
      "container": "name1",
      "object": "obj",
      "test.a": "a",
      "test.b": "b",
      "test.c.d": "d"
    })
  });
  test('example2', () => {
    const input = {
      "container": "name1",
      "object": "obj",
      "test": {
        "a": "a",
        "b": "b",
        "c": {
          "d": "d"
        }
      },
      "test2": {
        "a": "a",
        "b": "b",
        "c": {
          "d": "d",
          "e": {
            "f":"f"
          }
        }
      }
    };
    const result: keyStringValue = {}
    transformObject(input, "", result)
    expect(result).toEqual({
      "container": "name1",
      "object": "obj",
      "test.a": "a",
      "test.b": "b",
      "test.c.d": "d",
      "test2.a": "a",
      "test2.b": "b",
      "test2.c.d": "d",
      "test2.c.e.f": "f"
    })
  });

  test('example3', () => {
    const result: keyStringValue = {}
    const input = {
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
    const expectResult: keyStringValue = {
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
    };
    expect(result).toEqual(expectResult);
  });
})