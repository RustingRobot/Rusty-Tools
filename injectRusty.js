// all added features by RustingRobot are here :)
console.log("Rusty features loaded");

//-----global variables------//
var oSBtn;                   //onion skin button
var reSizeBtn;               //reset size button
var OpacityInp;              //Opacity input field
var FramesInp;               //Frames input field
var stageBtn;         
var osValue=false;           //used to save the state of activation of the onion skin
var SpriteCollection = [[]]; //a collection consisting of layerCollections for each sprite
var cardActActivated = false;
//---------------------------//

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
  if(document.getElementsByClassName('project-description')[1] && !cardActActivated){
    cardActActivated = true;
    applyCardActions();
  }

  if(document.URL.includes('editor')){editorSetup(); }
  else{window.setTimeout(waitForEditor,100);}}
function waitForElement(){  //loops until the bitmap button exists -then-> CostumesClick()
  if(!!document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B')[0]){CostumesClick(); }
  else{window.setTimeout(waitForElement,100);}}

  function CostumesClick(){ //append the custom  onion skin toolbar
    setNotStagedLayers();
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
  `);
  OpacityInp = document.getElementById("osAlphaInp");
  FramesInp = document.getElementById("osFrameNr");
  reSizeBtn = document.getElementsByClassName("button_button_u6SE2 paint-editor_button-group-button_1I1tm")[1];
  stageBtn = document.getElementById("onionAddBtn");
  osBtn  = document.getElementById("osBtn");
  osBtn.checked = osValue;  //if the osButton was previously checked, check it again
  //add functions to buttons
  osBtn.addEventListener("change", function() {
      OSClick();
  }, false);
  reSizeBtn.addEventListener("click", function() {
    window.setTimeout(stageClick,10);
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
    if(document.getElementById("osCanvas"))
      document.getElementById("osCanvas").parentNode.removeChild(document.getElementById("osCanvas"));
  }

  function DrawLoop(){  //update the hidden canvas (this function repeats until no longer in the costumes tab)
    let zoomLvl = 100/ parseInt(verticalScroll.style.height); //calculate the zoom level / full size is zoomLvl 1!
    osCanvasX = 480 * zoomLvl; 
    osCanvasY = 360 * zoomLvl;
    osOffsetX = (parseFloat(horizontalScroll.style.left) * zoomLvl / (zoomLvl - 1) - 50)* (zoomLvl-1) * 4.8;
    osOffsetY = (parseFloat(verticalScroll.style.top) * zoomLvl / (zoomLvl - 1) - 50)* (zoomLvl-1) * 3.6;
    dCanvas.clearRect(0, 0, canvas.width, canvas.height); //clear previous image 
    let img = new Image;
    dCanvas.globalAlpha = 0.2;
    
    img.src = SpriteCollection[getSelectedSprite()][getSelectedCostume() - 1];
    dCanvas.drawImage(img,canvas.width / 2 - osCanvasX / 2 - osOffsetX,canvas.height / 2 - osCanvasY / 2 - osOffsetY,osCanvasX,osCanvasY);
    img.src = SpriteCollection[getSelectedSprite()][getSelectedCostume() + 1];
    dCanvas.drawImage(img,canvas.width / 2 - osCanvasX / 2 - osOffsetX,canvas.height / 2 - osCanvasY / 2 - osOffsetY,osCanvasX,osCanvasY);
    console.debug("+1: "+SpriteCollection[getSelectedSprite()][getSelectedCostume() + 1]);
    console.debug("-1: "+SpriteCollection[getSelectedSprite()][getSelectedCostume() - 1]);
    /*
    for(var i=0;i<FramesInp.value;i++){
      //dCanvas.globalAlpha = dCanvas.globalAlpha * 0.5;
      img.style.opacity = 0.5;
      img.src = SpriteCollection[getSelectedSprite()][getSelectedCostume() - i];
      dCanvas.drawImage(img,canvas.width / 2 - osCanvasX / 2 - osOffsetX,canvas.height / 2 - osCanvasY / 2 - osOffsetY,osCanvasX,osCanvasY);  //the image gets drawn! (source, posX, posY, sizeX, sizeY)
    }
    dCanvas.globalAlpha = 0.5;
    for(var i=0;i<FramesInp.value;i++){
      //dCanvas.globalAlpha = dCanvas.globalAlpha * 0.5;
      img.src = SpriteCollection[getSelectedSprite()][getSelectedCostume() + i];
      dCanvas.drawImage(img,canvas.width / 2 - osCanvasX / 2 - osOffsetX,canvas.height / 2 - osCanvasY / 2 - osOffsetY,osCanvasX,osCanvasY);  //the image gets drawn! (source, posX, posY, sizeX, sizeY)
    }
    */
    OpacityInp.value = osValue;
    if(osValue){window.setTimeout(DrawLoop,0);} //restart DrawLoop() without stopping the browser
    else{return;}
  }
}

function stageClick(){
  SpriteCollection[getSelectedSprite()][getSelectedCostume()] = document.getElementsByClassName("paper-canvas_paper-canvas_1y588")[0].toDataURL(); //save current canvas to the right pos in SpriteCollection.
  setNotStagedLayers();
}

function getSelectedSprite(){
  var allSprites = document.getElementsByClassName("sprite-selector_items-wrapper_4bcOj box_box_2jjDp")[0].children;
  for(var i = 0; i < allSprites.length; i++){
    if(allSprites[i].firstChild.children.length == 4) //the selected sprite will have one child-element more (bin-icon)
      return i;
  }
}

function getSelectedCostume(){
  var allCostumes = document.getElementsByClassName("selector_list-area_1Xbj_ box_box_2jjDp")[0].children;
  for(var i = 0; i < allCostumes.length; i++){
    if(allCostumes[i].firstChild.children.length == 5)  //the selected costume will have one child-element more (bin-icon)
      return i;
  }
}

function setNotStagedLayers(){
  var allCostumes = document.getElementsByClassName("selector_list-area_1Xbj_ box_box_2jjDp")[0].children;
  for(var i = 0; i < allCostumes.length; i++){
    if(SpriteCollection[getSelectedSprite()][i] == null){
      allCostumes[i].firstChild.children[2].firstChild.classList.add("notStagedLayer");
    }else{
      allCostumes[i].firstChild.children[2].firstChild.classList.remove("notStagedLayer");
    }
  }
}

function applyCardActions(){
  document.getElementsByClassName("controls_controls-container_2xinB")[0].insertAdjacentHTML('beforeend',`
    <div id="TabBar" class="TabBar"></div> 
  `)
  var cardContent = document.getElementsByClassName('project-description')[1].innerHTML;
  appendTab("home","");
  
  var links = [];
  var linkTypes = [];
  var Indices = getIndicesOf("https://scratch.mit.edu/projects/",cardContent)
  for(var i = 0; i < Indices.length; i += 2){
    appendTab("sp",extractLink(Indices[i],"sp"));
  }
  Indices = getIndicesOf("https://scratch.mit.edu/discuss/youtube/",cardContent)
  for(var i = 0; i < Indices.length; i += 2){
    appendTab("yt",extractLink(Indices[i],"yt"));
  }
}

function extractLink(ogIndex,type){
  var index = ogIndex;
  var cardContent = document.getElementsByClassName('project-description')[1].innerHTML;
  while(cardContent[index] != '"' && index < ogIndex+80){index++;}
  var start;
  switch (type){
    case "yt":
      start = 40 + ogIndex;
      break;
    case "sp":
      start = 33 + ogIndex;
      break;
  }
  return cardContent.substring(start,index);
}

function appendTab(type,link){
  document.getElementById("TabBar").insertAdjacentHTML('beforeend', `
  <span class="tabButtons" role="button"><div class="button_content_3jdgj"></div></span>
  `)
  let allTabBtns = document.getElementsByClassName("tabButtons");
  allTabBtns[allTabBtns.length-1].classList.add(type+"Img");
  allTabBtns[allTabBtns.length-1].addEventListener("click",function() {
    appendCanvasIFrame(type,link);
  } , false);
}

function appendCanvasIFrame(type,link){
  removeElementsByClass("ytEmbed");
  removeElementsByClass("spEmbed");
  switch (type){
    case "home":
      break;
    case "yt":
      document.getElementsByClassName("stage_stage-wrapper_eRRuk box_box_2jjDp")[0].insertAdjacentHTML('beforeend', `
      <iframe class="ytEmbed" width="482" height="362" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);
      document.getElementsByClassName("ytEmbed")[0].setAttribute("src","https://www.youtube.com/embed/"+link);
      break;
    case "sp":
      document.getElementsByClassName("stage_stage-wrapper_eRRuk box_box_2jjDp")[0].insertAdjacentHTML('beforeend', `
      <iframe class="spEmbed" src="" allowtransparency="true" width="482" height="362" frameborder="0" scrolling="no" allowfullscreen></iframe>
      `);
      document.getElementsByClassName("spEmbed")[0].setAttribute("src","https://scratch.mit.edu/projects/"+link+"embed");
      break;
  }

}

function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
      return [];
  }
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}