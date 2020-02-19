var grid = document.getElementById("grid");
var testMode = false; //hien min
var numOfMine = 0;
generateGrid();
//grid.addEventListener('click',clicks);

/*grid.oncontextmenu = function ()
{
    //window.preventDefault();
    alert('right');
    //showCustomMenu();
    //return false;     // cancel default menu
}*/


function generateGrid() {
  //generate 10 by 10 grid
  grid.innerHTML="";
  
  for (var i=0; i<10; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<10; j++) {
      cell = row.insertCell(j);
      cell.setAttribute("clicked","false");
      cell.oncontextmenu = function()
      {
        //alert('hello');
       
        if (this.getAttribute("data-mine")=="true"&&this.getAttribute("clicked")=="false") 
        {
          this.setAttribute("clicked","true");
          this.className="mine";
          numOfMine++;
          //alert(numOfMine);
        } 
        checkLevelCompletion();
        return false;
      }
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() 
{
  for (var i=0; i<20; i++)//20 mine 
  {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = grid.rows[row].cells[col];
    if (cell.getAttribute("data-mine")=="true") i--;//bi trung
    else
        cell.setAttribute("data-mine","true");
    if (testMode) cell.innerHTML="X";// che do test
  }
}

function revealMines()//hien min 
{
    for (var i=0; i<10; i++) 
    {
      for(var j=0; j<10; j++) 
      {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="mine";
      }
    }
}

function checkLevelCompletion() 
{
  var levelComplete = true;
   for (var i=0; i<10; i++) 
    {
      for(var j=0; j<10; j++) 
      {
        if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
      }
  }
  if (levelComplete || numOfMine==20) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) 
{
  //Check click vao mine
  if (cell.getAttribute("data-mine")=="true") 
  {
    revealMines();
    alert("Game Over");
  } else 
  {
    cell.className="clicked";
    //dem so node ke
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) 
    {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) 
      {
        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;//hien so len o
    if (mineCount==0) //neu o bam vao la 0
    { 
      //hien xung quanh -> clickCell vao o ke voi no
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) 
      {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) 
        {
          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}
//ham de click chuot phai (bo)---------------------------------------------------------
var clickCount = 0;
// Our Timeout, modify it if you need
var timeout = 500;
// Copy this function and it should work
function clicks() {
  // We modify clickCount variable here to check how many clicks there was
  
      clickCount++;
      if (clickCount == 1) {
        setTimeout(function(){
          if(clickCount == 1) {
            console.log('singleClick');
            clickCell(this);
            // Single click code, or invoke a function 
          } else {
            console.log('double click');
            alert("hello");
            bdclickCell(this);
            // Double click code, or invoke a function 
          }
          clickCount = 0;
        }, timeout || 300);
      }
}
