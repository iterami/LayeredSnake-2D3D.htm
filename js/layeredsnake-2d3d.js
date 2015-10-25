'use strict';

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    // Draw layers.
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Draw layer.
        buffer.fillStyle = layers[loop_counter]['color'];
        buffer.fillRect(
          layers[loop_counter]['x'],
          layers[loop_counter]['y'],
          100,
          100
        );
    }while(loop_counter--);

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function generate_layers(){
    layers.length = 0;

    // Generate 100 layers.
    var loop_counter = 99;
    do{
        layers.push({
          'color': random_hex(),
          'parent-x': 0,
          'parent-y': 0,
          'x': Math.floor(Math.random() * width) - 50,
          'y': Math.floor(Math.random() * height) - 50,
        });
    }while(loop_counter--);

    set_target(
      mouse_x - 50,
      mouse_y - 50
    );
}

function logic(){
    // Handle layers.
    var loop_counter = layers.length - 1;
    do{
        if(loop_counter <= 0){
            break;
        }

        // Calculate movement towards parent layer.
        var angle = Math.atan(
          Math.abs(layers[loop_counter]['y'] - layers[loop_counter]['parent-y'])
            / Math.abs(layers[loop_counter]['x'] - layers[loop_counter]['parent-x'])
        );
        var dx = Math.cos(angle) *
          (layers[loop_counter]['x'] > layers[loop_counter]['parent-x']
            ? -5
            : 5);
        var dy = Math.sin(angle) *
          (layers[loop_counter]['y'] > layers[loop_counter]['parent-y']
            ? -5
            : 5);

        // Move towards parent layer.
        layers[loop_counter]['x'] += dx;
        layers[loop_counter]['y'] += dy;

        // Remember position of parent layer.
        layers[loop_counter]['parent-x'] = layers[loop_counter - 1]['x'];
        layers[loop_counter]['parent-y'] = layers[loop_counter - 1]['y'];
    }while(loop_counter--);
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
}

function set_target(x, y){
    layers[0]['x'] = x;
    layers[0]['y'] = y;
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var height = 0;
var layers = [];
var mouse_x = 0;
var mouse_y = 0;
var width = 0;

window.onkeydown =
  window.onmousedown = generate_layers;

window.onload = function(){
    resize();
    generate_layers();

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      50
    );
};

window.onmousemove =
  window.ontouchstart = function(e){
    set_target(
      mouse_x - 50,
      mouse_y - 50
    );

    mouse_x = e.pageX;
    mouse_y = e.pageY;
};

window.onresize = resize;
