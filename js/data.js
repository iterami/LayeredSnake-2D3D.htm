'use strict';

function draw_recursive(entity){
    if(entity === top_layer){
        return;
    }

    // Draw layer.
    canvas_setproperties({
      'properties': {
        'fillStyle': entity_entities[entity]['color'],
      },
    });
    canvas_buffer.fillRect(
      entity_entities[entity]['x'],
      entity_entities[entity]['y'],
      core_storage_data['layer-width'],
      core_storage_data['layer-height']
    );

    draw_recursive(entity_entities[entity]['parent']);
}

function logic_recursive(entity){
    if(entity === top_layer){
        return;
    }

    // Move towards parent layer.
    let speed = math_move_2d({
      'multiplier': core_storage_data['layer-speed'],
      'x0': entity_entities[entity]['x'],
      'x1': entity_entities[entity_entities[entity]['parent']]['x'],
      'y0': entity_entities[entity]['y'],
      'y1': entity_entities[entity_entities[entity]['parent']]['y'],
    });

    if(core_storage_data['layer-random'] !== 0){
        speed['x'] += core_random_number({
          'multiplier': core_storage_data['layer-random'],
        }) - core_storage_data['layer-random'] / 2;
        speed['y'] += core_random_number({
          'multiplier': core_storage_data['layer-random'],
        }) - core_storage_data['layer-random'] / 2;
    }

    entity_entities[entity]['x'] += speed['x'];
    entity_entities[entity]['y'] += speed['y'];

    logic_recursive(entity_entities[entity]['parent']);
}

function load_data(){
    top_layer = false;
    let parent_id = '';
    for(let i = 0; i < core_storage_data['snake-length']; i++){
        if(!top_layer){
            top_layer = i;
        }

        entity_create({
          'id': i,
          'properties': {
            'color': '#' + core_random_hex(),
            'parent': parent_id,
            'x': core_random_integer({
              'max': canvas_properties['width'],
            }) - core_storage_data['layer-width'] / 2,
            'y': core_random_integer({
              'max': canvas_properties['height'],
            }) - core_storage_data['layer-height'] / 2,
          },
        });

        parent_id = i;
    }
    last_entity = parent_id;
}
