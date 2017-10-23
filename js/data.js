'use strict';

function draw_recursive(entity){
    if(entity === top_layer){
        return;
    }

    // Draw layer.
    canvas_setproperties({
      'properties': {
        'fillStyle': core_entities[entity]['color'],
      },
    });
    canvas_buffer.fillRect(
      core_entities[entity]['x'],
      core_entities[entity]['y'],
      core_storage_data['layer-width'],
      core_storage_data['layer-height']
    );

    draw_recursive(core_entities[entity]['parent']);
}

function logic_recursive(entity){
    if(entity === top_layer){
        return;
    }

    // Move towards parent layer.
    var speed = math_move_2d({
      'multiplier': core_storage_data['layer-speed'],
      'x0': core_entities[entity]['x'],
      'x1': core_entities[core_entities[entity]['parent']]['x'],
      'y0': core_entities[entity]['y'],
      'y1': core_entities[core_entities[entity]['parent']]['y'],
    });
    core_entities[entity]['x'] += speed['x'];
    core_entities[entity]['y'] += speed['y'];

    logic_recursive(core_entities[entity]['parent']);
}

function load_data(){
    top_layer = false;
    var parent_id = '';
    for(var i = 0; i < core_storage_data['snake-length']; i++){
        var this_id = core_uid();
        if(!top_layer){
            top_layer = this_id;
        }

        core_entity_create({
          'id': this_id,
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

        parent_id = this_id;
    }
    last_entity = parent_id;
}
