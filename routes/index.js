var express = require('express');
const user = require('../database/user');
const USER =user.model;
const USERSCHEMA = user.schema;
var valid =require("../utils/valid");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msn:"TAREA 2"
  })
});

router.post('/user',async(req, res)=>{
  var params =req.body;
  params["updateDate"]=new Date();
  //params["updateDate "]=new Date();
  if(!valid.checkparams(USERSCHEMA, params)){
    res.status(300).json({
      msn:"parametros incorrectos"
    });
    return;
  }
  var user = new USER(params);
  var result = await user.save();
  res.status(200).json(result);
});

router.get("/user",async(req, res)=>{
  var params = req.query;
  var limit = 100;
  if(params.limit != null) {
    limit = parseInt(params.limit);
  }

  var list =await USER.find({}).limit(limit);
  res.status(200).json(list);
});

router.put('/user',async(req, res)=>{
  var params =req.body;
  var id = req.query.id;
  if (id ==null ){
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }
  params["updateDate"]=new Date();
  if(!valid.checkparams(USERSCHEMA, params)){
    res.status(300).json({
      msn:"parametros incorrectos"
    });
    return;
  }
  delete params.register;
  var result =await  USER.findOneAndUpdate({_id:id},params);
  res.status(200).json(result);
});


router.patch('/user',async(req, res)=>{
  var params =req.body;
  var id = req.query.id;
  if (id ==null ){
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }

  var result =await  USER.findOneAndUpdate({_id:id},params);
  res.status(200).json(result);
});

router.delete("/user", async(req, res)=>{
  var id = req.query.id;
  if (id ==null ){
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }
  var result = await USER.remove({_id: id});
  res.status(200).json(result);
})

module.exports = router;
