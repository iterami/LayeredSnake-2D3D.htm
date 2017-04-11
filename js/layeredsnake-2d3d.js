'use strict';

function draw_logic(){
    // Draw layers.
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Draw layer.
        canvas_buffer.fillStyle = layers[loop_counter]['color'];
        canvas_buffer.fillRect(
          layers[loop_counter]['x'],
          layers[loop_counter]['y'],
          layer_size,
          layer_size
        );
    }while(loop_counter--);
}

function generate_layers(){
    layers.length = 0;

    // Generate 100 layers.
    var loop_counter = 99;
    do{
        layers.push({
          'color': '#' + random_hex(),
          'x': random_integer({
            'max': canvas_width,
          }) - layer_size / 2,
          'y': random_integer({
            'max': canvas_height,
          }) - layer_size / 2,
        });
    }while(loop_counter--);

    update_target();
}

function logic(){
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Calculate movement towards previous layer.
        var previous = loop_counter - 1;
        var speed = math_move_2d({
          'multiplier': layer_speed,
          'x0': layers[loop_counter]['x'],
          'y0': layers[loop_counter]['y'],
          'x1': layers[previous]['x'],
          'y1': layers[previous]['y'],
        });

        // Move towards previous layer.
        layers[loop_counter]['x'] += speed['x'];
        layers[loop_counter]['y'] += speed['y'];
    }while(loop_counter--);
}

function update_target(){
    layers[0]['x'] = input_mouse['x'] - layer_size / 2;
    layers[0]['y'] = input_mouse['y'] - layer_size / 2;
}

var layer_size = 100;
var layer_speed = 3;
var layers = [];

window.onload = function(){
    canvas_init();
    input_init({
      'keybinds': {
        'all': {
          'todo': generate_layers,
        },
      },
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              generate_layers();
              update_target();
          },
        },
        'mousemove': {
          'todo': update_target,
        },
      },
    });

    generate_layers();
};
