

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var canvas = document.getElementById('draw');

  // get canvas 2D context and set it to the correct size
  var ctx = canvas.getContext('2d');
  resize(); 

  // resize canvas when window is resized
  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("imageLoader").value = "";
}

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);

  // last known position
  var pos = { x: 0, y: 0 };

  // new position from mouse events
  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }



function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}


function draw(e) {
    
    if (e.buttons !== 1) return; // if mouse is pressed.....

    var color = document.getElementById('hex').value;
    var lineWidth = document.getElementById('lineWidth').value;
    var lineCap = getSelectedText('lineCap');

    ctx.beginPath(); // begin the drawing path

    ctx.lineWidth = parseInt(lineWidth); // width of line 
    ctx.lineCap = lineCap.toLowerCase(); // rounded end cap
    ctx.strokeStyle = color; // hex color of line
    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 15;
    ctx.shadowColor = color;

    ctx.moveTo(pos.x, pos.y); // from position
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to position

    ctx.stroke(); // draw it!

   }

