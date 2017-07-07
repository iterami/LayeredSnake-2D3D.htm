'use strict';

function load_data(){
    layers.length = 0;

    var loop_counter = core_storage_data['snake-length'];
    do{
        layers.push({
          'color': '#' + core_random_hex(),
          'x': core_random_integer({
            'max': canvas_width,
          }) - layer_size / 2,
          'y': core_random_integer({
            'max': canvas_height,
          }) - layer_size / 2,
        });
    }while(loop_counter--);

    update_target();
}
