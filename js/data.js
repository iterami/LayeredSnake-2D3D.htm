'use strict';

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
