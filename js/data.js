'use strict';

function load_data(){
    var first_id = false;
    var parent_id = '';
    for(var i = 0; i < core_storage_data['snake-length']; i++){
        var this_id = core_uid();
        if(!first_id){
            first_id = this_id;
        }

        core_entity_create({
          'id': this_id,
          'properties': {
            'color': '#' + core_random_hex(),
            'parent': parent_id,
            'x': core_random_integer({
              'max': canvas_width,
            }) - core_storage_data['layer-width'] / 2,
            'y': core_random_integer({
              'max': canvas_height,
            }) - core_storage_data['layer-height'] / 2,
          },
        });

        parent_id = this_id;
    }
    top_layer = first_id;

    update_target();
}
