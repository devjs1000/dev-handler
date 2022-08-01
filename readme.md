 
 
 
  EXAMPLE
 handleThis({
    name: 'create buy',
    msg: 'failed to create buy entry',
    type: 'api',
    errorCode: 500,
    senders: { req, res },
    fn: async () => {
      const { party, hostId, stock, quantity, liftingDays, starred, remark, confirmDate, startDate, price, group, stockDateOffset, } = req.body;
      const buy = new Buy({ party, broker: hostId, stock, initialQuantity: quantity, liftedQuantity: 0, liftingDays, starred, remark, confirmDate, startDate, price, stockDateOffset });
      await buy.save();
      req.io.emit("refreshBuy");
      res.send(struct(true, " Success ", {}));
    }
  })