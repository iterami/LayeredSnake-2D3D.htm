'use strict';

function repo_drawlogic(){
    draw_recursive(last_entity);
}

function repo_logic(){
    if(core_storage_data['mouse-lock']
      || core_mouse['down-0']){
        entity_entities[top_layer]['x'] = core_mouse['x'] - core_storage_data['layer-width'] / 2;
        entity_entities[top_layer]['y'] = core_mouse['y'] - core_storage_data['layer-height'] / 2;
    }

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
          'onclick': core_repo_reset,
        },
      },
      'info': '<input id=explode type=button value=Explode>',
      'mousebinds': {
        'mousedown': {},
        'mousemove': {},
      },
      'reset': canvas_setmode,
      'storage': {
        'layer-height': 100,
        'layer-random': 0,
        'layer-speed': 3,
        'layer-width': 100,
        'mouse-lock': true,
        'snake-length': 99,
      },
      'storage-menu': '<table><tr><td><input class=mini id=layer-height min=1 step=any type=number><td>Layer Height'
        + '<tr><td><input class=mini id=layer-random step=any type=number><td>Layer Movement Randomness'
        + '<tr><td><input class=mini id=layer-speed min=0 step=any type=number><td>Layer Speed'
        + '<tr><td><input class=mini id=layer-width min=1 step=any type=number><td>Layer Width'
        + '<tr><td><input class=mini id=snake-length min=1 step=any type=number><td>Length'
        + '<tr><td><input id=mouse-lock type=checkbox><td>Mouse Lock</table>',
      'title': 'LayeredSnake-2D3D.htm',
    });
    canvas_init();
}
