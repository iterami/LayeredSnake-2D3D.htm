'use strict';

function draw_recursive(entity){
    if(entity === top_layer
      || entity === ''){
        return;
    }

    canvas_setproperties({
      'fillStyle': entity_entities[entity].color,
    });
    if(core_storage_data.type === 1){
        canvas.fillRect(
          entity_entities[entity].x - core_storage_data.layer_width,
          entity_entities[entity].y - core_storage_data.layer_height,
          core_storage_data.layer_width * 2,
          core_storage_data.layer_height * 2
        );

    }else{
        canvas_draw_path({
          'style': 'fill',
          'vertices': [
            [
              'ellipse',
              entity_entities[entity].x,
              entity_entities[entity].y,
              core_storage_data.layer_width,
              core_storage_data.layer_height,
              0,
              0,
              Math.PI * 2,
            ],
          ],
        });
    }

    draw_recursive(entity_entities[entity].parent);
}

function logic_recursive(entity){
    if(entity === top_layer){
        return;
    }

    const speed = math_move_2d({
      'speed': core_storage_data.layer_speed,
      'x0': entity_entities[entity].x,
      'x1': entity_entities[entity_entities[entity].parent].x,
      'y0': entity_entities[entity].y,
      'y1': entity_entities[entity_entities[entity].parent].y,
    });

    if(core_storage_data.layer_random !== 0){
        speed.x += Math.random() * core_storage_data.layer_random - core_storage_data.layer_random / 2;
        speed.y += Math.random() * core_storage_data.layer_random - core_storage_data.layer_random / 2;
    }

    entity_entities[entity].x += speed.x;
    entity_entities[entity].y += speed.y;

    logic_recursive(entity_entities[entity].parent);
}

function load_data(){
    top_layer = false;
    let parent_id = '';
    for(let i = 0; i < core_storage_data.snake_length + 2; i++){
        if(!top_layer){
            top_layer = i;
        }

        entity_create({
          'id': i,
          'properties': {
            'color': '#' + core_random_hex(),
            'parent': parent_id,
            'x': core_random_integer(canvas_properties.width) - core_storage_data.layer_width / 2,
            'y': core_random_integer(canvas_properties.height) - core_storage_data.layer_height / 2,
          },
        });

        parent_id = i;
    }
    last_entity = parent_id;
}

function repo_drawlogic(){
    draw_recursive(last_entity);
}

function repo_init(){
    core_repo_init({
      'globals': {
        'last_entity': '',
        'top_layer': 0,
      },
      'events': {
        'explode': {
          'onclick': canvas_setmode,
        },
      },
      'info': '<button id=explode type=button>Explode</button>',
      'pointerbinds': {},
      'storage': {
        'layer_height': 50,
        'layer_random': 0,
        'layer_speed': 3,
        'layer_width': 50,
        'pointer_lock': true,
        'snake_length': 99,
        'type': 0,
      },
      'storage-menu': '<table><tr><td><input class=mini id=layer_height min=1 step=any type=number><td>Layer Height'
        + '<tr><td><input class=mini id=layer_random step=any type=number><td>Layer Movement Randomness'
        + '<tr><td><input class=mini id=layer_speed min=0 step=any type=number><td>Layer Speed'
        + '<tr><td><input class=mini id=layer_width min=1 step=any type=number><td>Layer Width'
        + '<tr><td><input class=mini id=snake_length min=1 step=1 type=number><td>Length'
        + '<tr><td><input id=pointer_lock type=checkbox><td>Pointer Lock'
        + '<tr><td><select id=type><option value=0>Ellipse<option value=1>Rectangle</select><td>Type</table>',
      'title': 'LayeredSnake-2D3D.htm',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}

function repo_logic(){
    if(core_storage_data.pointer_lock
      || core_pointer['down-0']){
        entity_entities[top_layer].x = core_pointer.x;
        entity_entities[top_layer].y = core_pointer.y;
    }

    logic_recursive(last_entity);
}
