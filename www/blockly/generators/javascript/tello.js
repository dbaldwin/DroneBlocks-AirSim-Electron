Blockly.JavaScript['takeoff'] = function(block) {
  return 'takeoff';
};

Blockly.JavaScript['land'] = function(block) {
  return 'land';
};


Blockly.JavaScript['fly_to'] = function(block) {
  var xdistance = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_NONE);
  var ydistance = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_NONE);
  var zdistance = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue('units');
  
  var blockString = 'fly_to,';

  if(isNaN(parseInt(xdistance))) {
    blockString += '" + eval(' + xdistance + ') + "';
  } else {
    blockString += xdistance;
  }
  
  if(isNaN(parseInt(ydistance))) {
    blockString += '," + eval(' + ydistance + ') + "';
  } else {
    blockString += ',' + ydistance;
  }
  
  if(isNaN(parseInt(zdistance))) {
    blockString += '," + eval(' + zdistance + ') + "';
  } else {
    blockString += ',' + zdistance;
  }
  
  blockString += "," + units;
  
  return blockString;
  
};
