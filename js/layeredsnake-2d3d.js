'use strict';

function draw_logic(){
    for(var entity in core_entities){
        if(entity === top_layer){
            continue;
        }

        // Draw layer.
        canvas_buffer.fillStyle = core_entities[entity]['color'];
        canvas_buffer.fillRect(
          core_entities[entity]['x'],
          core_entities[entity]['y'],
          core_storage_data['layer-width'],
          core_storage_data['layer-height']
        );
    }
}

function logic(){
    for(var entity in core_entities){
        if(entity === top_layer){
            continue;
        }

        // Calculate movement towards parent layer.
        var speed = math_move_2d({
          'multiplier': core_storage_data['layer-speed'],
          'x0': core_entities[entity]['x'],
          'y0': core_entities[entity]['y'],
          'x1': core_entities[core_entities[entity]['parent']]['x'],
          'y1': core_entities[core_entities[entity]['parent']]['y'],
        });

        // Move towards parent layer.
        core_entities[entity]['x'] += speed['x'];
        core_entities[entity]['y'] += speed['y'];
    }
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
        'layer-height': 100,
        'layer-speed': 3,
        'layer-width': 100,
        'snake-length': 99,
      },
      'storage-menu': '<table><tr><td><input id=layer-height><td>Layer Height<tr><td><input id=layer-width><td>Layer Width<tr><td><input id=layer-speed><td>Layer Speed<tr><td><input id=snake-length><td>Length</table>',
      'title': 'LayeredSnake-2D3D.htm',
    });
    canvas_init();
}

function update_target(){
    core_entities[top_layer]['x'] = core_mouse['x'] - core_storage_data['layer-width'] / 2;
    core_entities[top_layer]['y'] = core_mouse['y'] - core_storage_data['layer-height'] / 2;
}

var top_layer = 0;
