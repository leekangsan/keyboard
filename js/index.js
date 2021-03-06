/* jshint browser:true */
/* globals Sizzle, $, domtoimage */
(function(){
  "use strict";
  const $ = Sizzle;

  /*// capture key events and prevent their default actions
  let map ={};
  document.addEventListener('keydown', function(e){
    e.preventDefault();
    let {key} = e;
    map[key] = true;
    //console.log(map);
    return false;
  });
  document.addEventListener('keyup', function(e){
    let {key} = e;
    if( map[key] ){
      delete map[key];
    }
    return false;
  });*/

  // don't allow the context menu to appear
  window.addEventListener('contextmenu', function(e){
    e.preventDefault();
    return false;
  });

  // define DOM elements
  const $keyboard = $('#keyboard')[0];
  const $modeToggle = $('#mode-toggle')[0];
  const $colourSelection = $('#colour-selection')[0];
  const $alignmentSelection = $('#alignment-selection')[0];
  const $savePNG = $('#savePNG')[0];
  const $saveJPG = $('#saveJPG')[0];

  let isColourModeEnabled = false;
  let colour = "white";

  $modeToggle.addEventListener('click', function(e){
    let {target} = e;
    let $colourSelection_inputs = $('#colour-selection input');
    let $kbd_inputs = $('#keyboard kbd input');
    if( target.tagName === "INPUT" ){
      if( target.value === "note" ){
        isColourModeEnabled = false;
        $('#colour-selection input').forEach(function(e){
          e.setAttribute('disabled', "");
        });
        $kbd_inputs.forEach(function(e){
          e.removeAttribute('disabled');
        });
      }else{
        isColourModeEnabled = true;
        $colourSelection_inputs.forEach(function(e){
          e.removeAttribute('disabled');
        });
        $kbd_inputs.forEach(function(e){
          e.setAttribute('disabled', "");
        });
      }
    }
  });

  $keyboard.addEventListener('click', function(e){
    let {target} = e;
    if( target.tagName === "KBD" ){
      if( isColourModeEnabled ){
        if( colour !== "white" ){
          target.setAttribute('data-colour', colour);
        }
      }
    }
  });

  $colourSelection.addEventListener('click', function(e){
    let {target} = e;
    if( target.tagName === "INPUT" ){
      colour = target.value;
    }
  });

  $alignmentSelection.addEventListener('click', function(e){
    let {target} = e;
    if( target.tagName === "INPUT" ){
      $keyboard.setAttribute('data-alignment', target.value);
    }
  });

  // save as png
  $savePNG.addEventListener('click', function(){
    domtoimage.toPng($keyboard)
      .then(function(blob){
      fetch(blob)
        .then(res => res.blob())
        .then(blob => window.saveAs(blob, "keyboard.png"));
    });
  });

  // save as jpg
  $saveJPG.addEventListener('click', function(){
    domtoimage.toJpeg($keyboard, {"quality": 0.8})
      .then(function(blob){
      fetch(blob)
        .then(res => res.blob())
        .then(blob => window.saveAs(blob, "keyboard.jpg"));
    });
  });
})();
