## EXAMPLE

```js
handleThis({
  name: "create user",
  errMsg: "failed to create user",
  type: "api",
  errorCode: 500,
  senders: { req, res },
  expectedOnPass: "ok",
  expectedOnFailed: 0,
  onSuccess: () => {
    console.log("yeah");
  },
  onFailed: () => {
    console.log("ops");
  },
  fn: async () => {
    const { userName, password } = req.body;
    const usr = new User({ userName, password });
    await usr.save();
    let data = {};
    res.send({ status: true, msg: "Success", data });
    return "ok";
  },
});
```

##OPTIONS

```
name : function name or use;
```

```
fn : main async fn;
```

```
type : api or fn;
note : default is fn;
```

```
errMsg : message on error;
note: this is required;
```

```
senders : {req, res};
note: only required in apis;
```

```
returnOnPass : value will be returned on pass;
note: this value  will be returned on pass of your fn;
```

```
returnOnFailed : value will be return on fail;
note: this value  will be returned on fail of your fn;
```

```
onSuccess : this function will be called on success;
note: this is optional;
```

```
onFailed : this function will be called on failure;
note: this is optional;
```

```
expectedOnPass: expected return value on success from your main fn;
note: this is optional but recommended;
```

```
expectedOnFailed: expected return value on failure from your main fn;
note: this is optional but recommended;
```
