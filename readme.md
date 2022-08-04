
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
  ```py
 ||===========================================================================================||
 || OPTION    | USE-CASE                                        | TYPE         | CONDITION    ||
 ||===========================================================================================||
 || name      | for identification on errors and ohter purposes | ``string``   | api and fn   ||
 || msg       | message shown on error                          | ``string``   | api and fn   ||
 || type      | fn or api | fn is default                       | ``string``   | api or fn    ||
 || errorCode | api error code send to user                     | ``number``   | api          ||
 || senders   | request and response method of api              | ``methods``  | api          ||
 || fn        | main function                                   | ``function`` | fn and api   ||
 ||===========================================================================================||
  ```
 
