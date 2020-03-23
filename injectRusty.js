// all added features by RustingRobot are here
console.log("Rusty features loaded");

//variables for all of this script
var oSBtn;
var osValue=false;
var costumeImages;

if (document.URL.includes('editor')) {asignElements();}
else{waitForEditor();}

function asignElements(){//set up everything in the editor (addEventListeners etc.)
  var costumesBtn = document.getElementById('react-tabs-2');
  costumesBtn.addEventListener("click", function() {
    waitForElement(); //wait for the costumes tab to load (more sprites more lag)
  }, false);
}
function waitForEditor(){//loops until the url contains "editor"
  if(document.URL.includes('editor')){asignElements(); }
  else{window.setTimeout(waitForEditor,100);}}
function waitForElement(){  //loops until the bitmap button exists
  if(!!document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B')[0]){CostumesClick(); }
  else{window.setTimeout(waitForElement,100);}}
function CostumesClick(){ //append the onion skin button (and other text fields)
  if(!!document.getElementById("osBtn")){return;} //check if this function already got executed
  //Onion Skin buttons and text fields:
  let convertBtn = document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B');
  convertBtn[0].insertAdjacentHTML('afterend', `
  <label class="onionSkinBtn">
    <input type="checkbox" id="osBtn">
    <span class="btnImg"></span>
  </label>
    <div class= "OnionSkin-container">
      <span class="alphaInputSpan">
        <input class="osAlphaInp" id="osAlphaInp" type = "text" placeholder="opacity"></input>
        <span class="label_input-label_1s1ft">%</span>
      </span>
      <span>
        <input class="osAlphaInp" id="osFrameNr" type = "text" placeholder="# frame"></input>
      </span>
    </div>
  `);
  var osBtn  = document.getElementById("osBtn");
  if(osValue){osBtn.checked=true;}
  else{osBtn.checked=false;}
  osBtn.addEventListener("change", function() {
      OSClick();
  }, false);
  //getty all images
  costumeImages = document.getElementsByClassName("sprite-selector-item_sprite-image_2QWuK");

}

function OSClick(){//set value for the onion skin button
  osValue = !osValue;
  if(osValue){
    let horizontalScroll= document.getElementsByClassName("scrollable-canvas_horizontal-scrollbar_2w6OD")[0];
    let verticalScroll= document.getElementsByClassName("scrollable-canvas_vertical-scrollbar_lbD_c")[0];
    let canvas = document.getElementsByClassName("paper-canvas_paper-canvas_1y588");
    let ctx = canvas[0].getContext("2d");
    ctx.drawImage(costumeImages[1],10,10,costumeImages[1].width,costumeImages[1].height);
  }
}
