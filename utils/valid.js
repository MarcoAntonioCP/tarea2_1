var valid={
  checkparams: function(refobj, evalueobj){
    if(Object.keys(refobj).sort().toString() ==Object.keys(evalueobj).sort().toString()){
      return true;
    }
    return false;
  }
};

module.exports = valid;
