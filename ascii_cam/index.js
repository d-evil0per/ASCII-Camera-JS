(function() {
	var asciiContainer = document.getElementById("ascii");
	var capturing = false;

	camera.init({
		width: 120,
		height: 80,
		fps: 30,
		mirror: false,

		onFrame: function(canvas) {
			ascii.fromCanvas(canvas, {
				 // contrast: 8,
				callback: function(asciiString) {
					asciiContainer.innerHTML = asciiString;

				}
			});

		},

		onSuccess: function() {
			capturing=true;
			document.getElementById("info").style.display = "none";
			document.getElementById("pause").style.display = "block";
			document.getElementById("pause").innerHTML="Take A Snap";
			camera.start();
			document.getElementById("pause").onclick = function() {
				if (capturing) 
				{
					document.getElementById("snap").innerHTML=document.getElementById("ascii").innerHTML;
				} 
				else 
				{
					
					document.getElementById("snap").innerHTML="";
					
				}
				capturing = !capturing; //false
			};
		},

		onError: function(error) {
			// TODO: log error
		},

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			asciiContainer.style.display = "none";
			document.getElementById("notSupported").style.display = "block";
		}
	});
})();



function changecolor(){

	var safeColors = ['00','33','66','99','cc','ff'];
	// var safeColors=['00','11','22','33','44','55','66','77','88','99','aa','bb','cc','dd','ee','ff'];
for(i=1;i<=15;i++)
{
	$("#snap span.sh_"+i).css('color',randomColor());
}
var randomColor = function() {
    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};

var rand = function() {
    return Math.floor(Math.random()*6);
};





}

function downloadpng()
{
		 var container = document.getElementById("snap"); // full page 
 				html2canvas(container).then(function(canvas) {
                var link = document.createElement("a");
                document.getElementById("snap").appendChild(link);
                link.download = "ascii_cam_"+Date()+".png";
                link.href = canvas.toDataURL("image/png");
                link.target = '_blank';
                link.click();
            });
}