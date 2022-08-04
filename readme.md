
##  EXAMPLE
 ```js
 handleThis({
    name: 'create user',
    msg: 'failed to create user',
    type: 'api',
    errorCode: 500,
    senders: { req, res },
    fn: async () => {
      const { userName, password } = req.body;
      const usr = new User({ userName, password });
      await usr.save();
      let data={}
      res.send({status:true, msg: "Success" , data ));
    }
  })
  ```
