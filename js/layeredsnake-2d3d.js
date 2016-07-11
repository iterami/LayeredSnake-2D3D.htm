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
          'x': Math.floor(Math.random() * canvas_width) - 50,
          'y': Math.floor(Math.random() * canvas_height) - 50,
        });
    }while(loop_counter--);

    set_target(
      input_mouse['x'] - 50,
      input_mouse['y'] - 50
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

window.onload = function(){
    canvas_init();
    input_init(
      {
        'all': {
          'todo': generate_layers,
        },
      },
      {
        'mousedown': {
          'todo': function(){
              generate_layers();

              set_target(
                input_mouse['x'] - 50,
                input_mouse['y'] - 50
              );
          },
        },
        'mousemove': {
          'todo': function(){
              set_target(
                input_mouse['x'] - 50,
                input_mouse['y'] - 50
              );
          },
        },
      }
    );

    generate_layers();
};
