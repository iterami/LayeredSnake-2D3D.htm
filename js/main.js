'use strict';

function draw_logic(){
    draw_recursive(last_entity);
}

function logic(){
    logic_recursive(last_entity);
}

function repo_init(){
    core_repo_init({
      'globals': {
        'last_entity': '',
        'top_layer': 0,
      },
      'events': {
        'explode': {
          'onclick': function(){
              canvas_setmode();
              core_escape();
          },
        },
      },
      'info': '<input id=explode type=button value=Explode>',
      'mousebinds': {
        'mousemove': {
          'todo': function(){
              core_entities[top_layer]['x'] = core_mouse['x'] - core_storage_data['layer-width'] / 2;
              core_entities[top_layer]['y'] = core_mouse['y'] - core_storage_data['layer-height'] / 2;
          },
        },
      },
      'storage': {
        'layer-height': 100,
        'layer-random': 0,
        'layer-speed': 3,
        'layer-width': 100,
        'snake-length': 99,
      },
      'storage-menu': '<table><tr><td><input id=layer-height><td>Layer Height'
        + '<tr><td><input id=layer-random><td>Layer Movement Randomness'
        + '<tr><td><input id=layer-width><td>Layer Width'
        + '<tr><td><input id=layer-speed><td>Layer Speed'
        + '<tr><td><input id=snake-length><td>Length</table>',
      'title': 'LayeredSnake-2D3D.htm',
    });
    canvas_init();
}
