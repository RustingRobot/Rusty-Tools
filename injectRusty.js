// all added features by RustingRobot are here
console.log("Rusty features loaded");

let costumesBtn = document.getElementById('react-tabs-2');
var oSBtn;

costumesBtn.addEventListener("click", function() {
    setTimeout(CostumesClick,0);
}, false);

function CostumesClick(){
  let convertBtn = document.getElementsByClassName('button_button_u6SE2 paint-editor_bitmap-button_keW7B');
  convertBtn[0].insertAdjacentHTML('afterend', `
    <div class= "OnionSkin-container">
      <label class="onionSkinBtn" value="OFF">
        <input type="checkbox" id="osBtn">
        <span class="btnImg"></span>
      </label>
      <input class="osAlphaInp" id="osAlphaInp" type = "text"></input>
      </dev>
  `);

  oSBtn  = document.getElementById("osBtn");
  oSBtn.value = "OFF";
  oSBtn.addEventListener("change", function() {
      OSClick();
  }, false);
}

function OSClick(){
  if (oSBtn.value == "OFF") {
    oSBtn.value = "ON";
  } else {
    oSBtn.value = "OFF";
  }
  console.log(oSBtn.value);
}

/*



<div>
  <span class="button_button_u6SE2 tool-select-base_mod-tool-select_1iD-h" role="button" title="OnionSkin">
    <button type="checkbox" class="onionSkinBtn" value="ON" onclick="OSClick(this)"></button>
  </span>
</div>

<span class="button_button_u6SE2 tool-select-base_mod-tool-select_1iD-h" role="button" title="OnionSkin">
  <label class="onionSkinBtn">
    <input type="checkbox">
    <span class="btnImg"></span>
  </label>
</span>

*/
