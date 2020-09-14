Blockly.Blocks['fly_to'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly to x %1 y %2 z %3 %4",
        "args0": [
          {
            "type": "input_value",
            "name": "x"
          },
          {
            "type": "input_value",
            "name": "y"
          },
          {
            "type": "input_value",
            "name": "z"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["m", "m"],
               ["ft", "ft"]]
          },
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#0000FF"
      });
  }
};