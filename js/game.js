

// Game start in JS


// Defines global values that constantly update on the click of the form button for the form inputs
function formVals(){
  globalThis.hValue = parseInt(document.getElementById('heightInput').value);
  globalThis.lValue = parseInt(document.getElementById('lengthInput').value);
  console.log(lValue, hValue); // for debugging
};

// checks if chocolate piece is visible or not depending on the element ID it is given
function checkVis(id){
  // preconditions
  if ((typeof id === 'string') && (id.length === 5)){
    var first = 10;
    var last = 10;
    }
  else if ((typeof id === 'string') && (id.length === 4) && (id[1] == "0")){
    var first = 10;
    var last = id[3];
  }
  else if ((typeof id === 'string') && (id.length === 4) && (id[3] == "0")){
    var first = id[0]
    var last = 10;
  }
  else if ((typeof id === 'string') && (id.length === 3)){
    var first = id[0];
    var last = id[2];
  }
  else if ((typeof id === 'number') && (id.toString().length === 4)){
      var first = 10;
      var last = 10;
    }
  else if ((typeof id === 'number') && (id.toString().length === 3) && (String(id)[1] == "0")){
    var first = 10;
    var last = String(id)[2];
  }
  else if ((typeof id === 'number') && (id.toString().length === 3) && (String(id)[2] == "0")){
    var first = String(id)[0];
    var last = 10;
  }
  else if ((typeof id === 'number') && (id.toString().length === 2)){
    var first = String(id)[0];
    var last = String(id)[1];
  }
  // ----] end of preconditions

  let idString = "imgPos" + first + "_" + last;
  var chocci = d.getElementById(idString);
  if (chocci.classList.contains('visible')){
    return true;
  } else {
    return false;
  }
};

function Remplace(gridTest,x,y){
  gridTest = reverseArray(gridTest);
  let save = gridTest[y-1];
  for (let t = 0; t < save.length; t++) {
    if (t+1 >= x){
      save[t] = 0;
    }
  }
  gridTest[y-1] = save;
  for (let t = 0; t < y; t++){
    let save = gridTest[t];
    save[x-1] = 0;
    gridTest[t] = save;
  }
  return gridTest;
};

// creates an array for the chocolate pieces and assigns them a value(1 if visible 0 if not)
function checkAll(){
  globalThis.grid = new Array(hValue).fill(0).map(() => new Array(lValue).fill(0));
  for (let i = 0; i < hValue; i++){
    for (let j = 0; j < lValue; j++){
      let imageCheck = String(j+1) + '_' + String(i+1);
      if (checkVis(imageCheck) == true){
        grid[i][j] = 1;
      } else if (checkVis(imageCheck) == false){
        grid[i][j] = 0;
      }
    }
  }
  grid = reverseArray(grid); // makes the array upside down
  return grid;
};

// function that removes the image visibility if its value in the array is 0
function removeChoc(gridRemove){
  var notVis = 0;
  for (let i = 0; i < hValue; i++){
    for (let j = 0; j < lValue; j++){
      let imageCheck = "imgPos" + String(j+1)+ '_' +String(i+1);
      let imgElem = document.getElementById(imageCheck);
      if (gridRemove[i][j] == notVis){
        imgElem.classList.remove("visible");
      }
    }
  }
};

function reverseArray (arr){
    if (arr.length === 0){
      return []
    }
    return [arr.pop()].concat(reverseArray(arr))
  };

function doGame(e){
  checkAll();
  if (e.classList.contains('visible')){
    var choc_VisOrNot = true;
  } else {
    var choc_VisOrNot = false;
  }

  if (choc_VisOrNot == false){
    alert("Cage occupee!");
    return;
  }

  var choc_piece = e.getAttribute("id");
  choc_piece = choc_piece.replace('imgPos', '');
  if (choc_piece.length === 5){
      var x1 = 10;
      var y1 = 10;
    }
  else if ((choc_piece.length === 4) && (choc_piece[1] == "0")){
    var x1 = 10;
    var y1 = choc_piece[3];
  }
  else if ((choc_piece.length  === 4) && (choc_piece[3] == "0")){
    var x1 = choc_piece[0];
    var y1 = 10;
  }
  else if (choc_piece.length  === 3){
    var x1 = choc_piece[0];
    var y1 = choc_piece[2];
  }
  let newGrid = Remplace(checkAll(), x1, y1);
  removeChoc(newGrid);
};

function EvalPos(gridTest){
  let newPosition = [];
  for(let i = 0; i < gridTest.length; i++){

    //console.log("Evalx", evalX);
    for(let j = 0; j < gridTest[i].length; j++){
      //console.log("Grid", gridTest, j+1, i+1);
      if (gridTest[i][j] != 0){
        //console.log("Grid where evalx[j] isnt 0", evalX[j] gridTest, j+1, i+1);
        newPosition = newPosition.concat(Array(Remplace(Array.from(gridTest), j+1, i+1)));
      }
    }
  }
  return newPosition;
};

function startGame(){
  $("input").attr("readonly", true);
  document.getElementById("buttonChange").removeAttribute("onclick");
};
