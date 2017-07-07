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

function repo_init(){
    core_repo_init({
      'mousebinds': {
        'mousedown': {
          'todo': canvas_setmode,
        },
        'mousemove': {
          'todo': update_target,
        },
      },
      'storage': {
        'snake-length': 99,
      },
      'storage-menu': '<table><tr><td><input id=snake-length><td>Length</table>',
      'title': 'LayeredSnake-2D3D.htm',
    });
    canvas_init();
}

function update_target(){
    layers[0]['x'] = core_mouse['x'] - layer_size / 2;
    layers[0]['y'] = core_mouse['y'] - layer_size / 2;
}

var layer_size = 100;
var layer_speed = 3;
var layers = [];
