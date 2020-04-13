// all added features by RustingRobot are here
console.log("Rusty features loaded");

//variables for all of this script
var oSBtn;
var osValue=false;
var costumeImages;
if (document.URL.includes('editor')) {editorSetup();}
else{waitForEditor();}

function editorSetup(){//set up everything in the editor (addEventListeners etc.)
  //groupVariables();
  var costumesBtn = document.getElementById('react-tabs-2');
  costumesBtn.addEventListener("click", function() {
    waitForElement(); //wait for the costumes tab to load (more sprites more lag)
  }, false);
}
function waitForEditor(){//loops until the url contains "editor"
  if(document.URL.includes('editor')){editorSetup(); }
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
    var horizontalScroll= document.getElementsByClassName("scrollable-canvas_horizontal-scrollbar_2w6OD")[0];
    var verticalScroll= document.getElementsByClassName("scrollable-canvas_vertical-scrollbar_lbD_c")[0];
    let canvasContainer = document.getElementsByClassName("paint-editor_canvas-container_x2D0a")[0];
    canvasContainer.insertAdjacentHTML('beforeend',`
    <canvas id="osCanvas" class ="osCanvas" width="480" height="360"></canvas>
    `)
    var canvas = document.getElementById("osCanvas");
    var dCanvas = canvas.getContext("2d");
    var zoomLvl, midCanvasX, midCanvasY;
    DrawLoop();
  }else{
    document.getElementById("osCanvas").parentNode.removeChild(document.getElementById("osCanvas"));
  }

  function DrawLoop(){
    let frameNr = document.getElementById("osFrameNr");
    let opacity = document.getElementById("osAlphaInp");
    try{
      zoomLvl = 140 / parseInt(horizontalScroll.style.width);//170
      xZoom =100/((100 + costumeImages[parseInt(frameNr.value)].width) / zoomLvl);
      yZoom =100/((100 + costumeImages[parseInt(frameNr.value)].height) / zoomLvl);
      midCanvasX = (canvas.width / 2) -(costumeImages[parseInt(frameNr.value)].width / 2 *zoomLvl);
      midCanvasY = (canvas.height / 2) - (costumeImages[parseInt(frameNr.value)].height / 2 *zoomLvl);
      dCanvas.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style["opacity"] = parseInt(opacity.value) / 100;
      //dCanvas.drawImage(costumeImages[1],midCanvasX,midCanvasY,costumeImages[1].width * zoomLvl,costumeImages[1].height * zoomLvl);
      dCanvas.strokeStyle = "red";
      dCanvas.lineWidth = "6";
      dCanvas.drawImage(costumeImages[parseInt(frameNr.value)],midCanvasX,midCanvasY,costumeImages[parseInt(frameNr.value)].width * zoomLvl,costumeImages[parseInt(frameNr.value)].height * zoomLvl);
    }
    catch{
      dCanvas.clearRect(0, 0, canvas.width, canvas.height);
      //dCanvas.drawImage(costumeImages[0],midCanvasX,midCanvasY,costumeImages[1].width * zoomLvl,costumeImages[1].height * zoomLvl);
    }
    if(osValue){window.setTimeout(DrawLoop,0);}
    else{return;}
  }
}

/*function groupVariables(){
  let flyout = document.getElementsByClassName("blocklyFlyout")[0];
  let ws = flyout.childNodes[1].childNodes[0];
  var blocks = ws.childNodes;
  if(blocks.length < 228){window.setTimeout(groupVariables,1000); return;}
  var makeVarBtn = document.getElementsByClassName("blocklyFlyoutButton")[0];
  var minY = yOf(makeVarBtn);
  var maxY = 0;
  var vars = [];
  for (var i = 0; i < blocks.length; i++) {
    if(!!blocks[i].getAttribute('transform')){
      if(maxY == 0){
        if(blocks[i].getAttribute('data-id') == "data_setvariableto"){
          maxY = parseInt(yOf(blocks[i]));
          i=-1; continue;
        }
      }else if (yOf(blocks[i]) > 8108 && yOf(blocks[i]) < maxY){
        vars.push(blocks[i]);
      }
    }
  }
  let varLable = document.getElementsByClassName("blocklyFlyoutLabelText")[7];
  varLable.innerHTML += " (" + vars.length / 2 + ")";
  varLable.classList.add('newLabel');
  varLable.setAttribute("x",50 + 8 * String(vars.length / 2).length);
  insertCollapsables(makeVarBtn, vars);

  function yOf(element){
    let tempY = element.getAttribute('transform');
    tempY = tempY.split(",")[1];
    return tempY.substring(0,tempY.length - 1);
  } //returns the X of a translate()
}*/
/*
function insertCollapsables(makeVarBtn, vars){
  var s = new XMLSerializer();
  makeVarBtn.insertAdjacentHTML('afterend', `
  <g class="collapsible" transform="translate(12,8160)" display="block" id = "collapsible">
    <rect class="collapsableBG" rx="4" ry="4" width="194.4499969482422" height="40"></rect>
    <text class="blocklyText" x="97.2249984741211" y="20" text-anchor="middle" dominant-baseline="central" dy="0">test</text>
  </g>`);

  vars[3].classList.add('content');
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggleclassList("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}
*/
