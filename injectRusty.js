// all added features by RustingRobot are here :)
console.log("Rusty features loaded");

//-global variables-//
var oSBtn;          //onion skin button
var OpacityInp;     //Opacity input field
var FramesInp;     //Frames input field
var osValue=false;  //used to save the state of activation of the onion skin
var stagedLayers;   //list of URIs representing individual costumes 
//------------------//

if (document.URL.includes('editor')) {editorSetup();} //don't start editorSetup() if not in editor mode
else{waitForEditor();}

function editorSetup(){//set up everything in the editor (addEventListeners etc.)
  //groupVariables();
  var costumesBtn = document.getElementById('react-tabs-2');
  costumesBtn.addEventListener("click", function() {
    waitForElement(); //wait for the costumes tab to load (more sprites == more lag)
  }, false);
}

function waitForEditor(){//loops until the url contains "editor" -then-> editorSetup()
  if(document.URL.includes('editor')){editorSetup(); }
  else{window.setTimeout(waitForEditor,100);}}
function waitForElement(){  //loops until the bitmap button exists -then-> CostumesClick()
  if(!!document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B')[0]){CostumesClick(); }
  else{window.setTimeout(waitForElement,100);}}

  function CostumesClick(){ //append the custom  onion skin toolbar
  if(!!document.getElementById("osBtn")){return;} //check if this function already got executed
  let convertBtn = document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B');
  convertBtn[0].insertAdjacentHTML('afterend', `
  <label class="onionSkinBtn" title="set onion skin">
    <input type="checkbox" id="osBtn">
    <span class="btnImg"></span>
  </label>
    <div class= "OnionSkin-container">
      <span class="alphaInputSpan" title="set opacity">
        <input class="osAlphaInp" id="osAlphaInp" type = "text" placeholder="opacity"></input>
        <span class="label_input-label_1s1ft">%</span>
      </span>
      <span>
        <input class="osAlphaInp" id="osFrameNr" type = "text" placeholder="# frame" title="set frame nr."></input>
      </span>
    </div>
  <label >
    <button type="button" class="onionAddBtn" id="onionAddBtn" title="stage this frame"></button> 
  </label>
  `);
  OpacityInp = document.getElementById("osAlphaInp");
  FramesInp = document.getElementById("osFrameNr");
  osBtn  = document.getElementById("osBtn");
  osBtn.checked = osValue;  //if the osButton was previously checked, check it again
  osBtn.addEventListener("change", function() {
      OSClick();
  }, false);
  stageBtn.addEventListener("click", function() {
    stageClick();
  })
}

function OSClick(){//set value for the onion skin button
  osValue = !osValue;
  if(osValue){
    var horizontalScroll= document.getElementsByClassName("scrollable-canvas_horizontal-scrollbar_2w6OD")[0];
    var verticalScroll= document.getElementsByClassName("scrollable-canvas_vertical-scrollbar_lbD_c")[0];
    let canvasContainer = document.getElementsByClassName("paint-editor_canvas-container_x2D0a")[0];
    //here we get sneaky, we add our own canvas in front of the already existing canvas to avoid the default annoying screen refreshes to make our own
    canvasContainer.insertAdjacentHTML('beforeend',`
    <canvas id="osCanvas" class ="osCanvas" width="480" height="360"></canvas>
    `)
    var canvas = document.getElementById("osCanvas");
    var dCanvas = canvas.getContext("2d");  //dCanvas is drawable
    dCanvas.imageSmoothingEnabled = false;  //disable anti-aliasing since it looks a bit weird at higher zoom levels
    var osCanvasX,osCanvasY,osOffsetX,osOffsetY;
    DrawLoop();
  }else{
    document.getElementById("osCanvas").parentNode.removeChild(document.getElementById("osCanvas"));
  }

  function DrawLoop(){  //update the hidden canvas (this function repeats until no longer in the costumes tab)
    let zoomLvl = 100/ parseInt(verticalScroll.style.height); //calculate the zoom level / full size is zoomLvl 1!
    let img = new Image;
    img.src = stagedLayers;
    osCanvasX = img.width * zoomLvl; 
    osCanvasY = img.height * zoomLvl;
    osOffsetX = (parseFloat(horizontalScroll.style.left) * zoomLvl / (zoomLvl - 1) - 50)* (zoomLvl-1) * 4.8;
    osOffsetY = (parseFloat(verticalScroll.style.top) * zoomLvl / (zoomLvl - 1) - 50)* (zoomLvl-1) * 3.6;
    dCanvas.clearRect(0, 0, canvas.width, canvas.height); //clear previous image 
    dCanvas.drawImage(img,canvas.width / 2 - osCanvasX / 2 - osOffsetX,canvas.height / 2 - osCanvasY / 2 - osOffsetY,osCanvasX,osCanvasY);  //the image gets drawn! (source, posX, posY, sizeX, sizeY)
    if(osValue){window.setTimeout(DrawLoop,0);} //restart DrawLoop() without stopping the browser
    else{return;}
  }
}

function stageClick(){
  stagedLayers = document.getElementsByClassName("paper-canvas_paper-canvas_1y588")[0].toDataURL();
}