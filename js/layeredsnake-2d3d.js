'use strict';

function draw_logic(){
    // Draw layers.
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Draw layer.
        buffer.fillStyle = layers[loop_counter]['color'];
        buffer.fillRect(
          layers[loop_counter]['x'],
          layers[loop_counter]['y'],
          100,
          100
        );
    }while(loop_counter--);
}

function generate_layers(){
    layers.length = 0;

    // Generate 100 layers.
    var loop_counter = 99;
    do{
        layers.push({
          'color': random_hex(),
          'x': Math.floor(Math.random() * width) - 50,
          'y': Math.floor(Math.random() * height) - 50,
        });
    }while(loop_counter--);

    set_target(
      mouse_x - 50,
      mouse_y - 50
    );
}

function logic(){
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Calculate movement towards previous layer.
        var previous = loop_counter - 1;
        var angle = Math.atan(
          Math.abs(layers[loop_counter]['y'] - layers[previous]['y'])
            / Math.abs(layers[loop_counter]['x'] - layers[previous]['x'])
        );
        var dx = Math.cos(angle) *
          (layers[loop_counter]['x'] > layers[previous]['x']
            ? -5
            : 5);
        var dy = Math.sin(angle) *
          (layers[loop_counter]['y'] > layers[previous]['y']
            ? -5
            : 5);

        // Move towards previous layer.
        layers[loop_counter]['x'] += dx;
        layers[loop_counter]['y'] += dy;
    }while(loop_counter--);
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function set_target(x, y){
    layers[0]['x'] = x;
    layers[0]['y'] = y;
}

var layers = [];
var mouse_x = 0;
var mouse_y = 0;

window.onkeydown =
  window.onmousedown = generate_layers;

window.onload = function(){
    init_canvas();
    generate_layers();
};

window.onmousemove =
  window.ontouchstart = function(e){
    mouse_x = e.pageX;
    mouse_y = e.pageY;

    set_target(
      mouse_x - 50,
      mouse_y - 50
    );
};
