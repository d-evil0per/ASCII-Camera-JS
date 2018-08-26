# ASCII-Camera-JS
How to make a ASCII Camera and Download  the generated image 
<p>This application Uses These Two Javascripts Which Is developed By <a href="http://github.com/idevelop">Andrei Gheorghe </a> </p>
<div class="row mt-5">
	<div class="col-lg-6 ml-5" >

<h2>Camera.js</h2>
<p style="word-wrap:break-word;">A simple wrapper around the HTML5 <span style="color:#e83e8c">getUserMedia API</span>, offering cross-browser access to the user's webcam video stream.</p>
<h5>Usage</h5>
<p style="word-wrap:break-word;">
Upon initalization, the library asks the user for permission, sets up the necessary getUserMedia code and starts the stream. All parameters are optional, their default values are explained below.<br>The <span style="color:#e83e8c">onFrame</span> callback function is called each time there is a new frame to be processed, with respect to the <span style="color:#e83e8c">fps</span> option.<br>
If you want the video stream to also be rendered in a <code>"canvas"</code> element, set the targetCanvas option to an element reference.</p>
<p>To pause the video capture, call <code>camera.pause()</code>. To resume, call <code>camera.start()</code>.</p>
</div>

<div class="col-lg-5" >
<figure >
  <center><figcaption>JS script</figcaption></center>
  <pre style="color: #e83e8c;background: #a0a0a038">
    <code >
&lt;script&gt;
camera.init({
	width: 160, // default: 640
	height: 120, // default: 480
	fps: 30, // default: 30
	mirror: true,  // default: false
	targetCanvas: document.getElementById('webcam'), // default: null 

	onFrame: function(canvas) {
		// do something with image data found in the canvas argument
	},

	onSuccess: function() {
		// stream succesfully started, yay!
		camera.start();
		//or camera.pause(); depend upon the logic.
	},

	onError: function(error) {
		// something went wrong on initialization
	},

	onNotSupported: function() {
		// instruct the user to get a better browser
	}
});
&lt;/script&gt;
    </code>
  </pre>
</figure>
</div>


</div>
<div class="row mt-5">
	<div class="col-lg-6 ml-5" >
		<h2>Ascii.js</h2>
		<p>The library returns a global object named <span style="color:#e83e8c">ascii</span> , this object has only 1 property <span style="color:#e83e8c">"fromCanvas"</span>. This function expects as first parameter the canvas which is going to be processed and as second parameter an object with the properties.</p>
		<h5>Working</h5>
<ul>
	<li><p>The library will use the following characters in the ascii string <span style="color:#e83e8c">".,:;i1tfLCG08@"</span>.</p></li>
	<li><p> By given contrast value its calculate the <span style="color:#e83e8c">contrastFactor</span> using this formula </p></li>
<li>
  <p><span style="color:#e83e8c">contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))</span><br>
			<small><a style="color:#a0a0a0" href="http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/">http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/</a></small>
  </p>
      </li>

<li>
    <p>Then it will use a loop with the retrieved pixel data using the getImageData function from the canvas and according to the brightness of every pixel.</p>
    </li>
		<li>
    <p>Color brightness is determined by the following formula: </p>
    </li>
		<li>
    <p><span style="color:#e83e8c"> ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000 </span>
    <br>
		<small><a style="color:#a0a0a0" href="http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color">http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color</a>
   
  </small>
		</p>
    </li>
		<li>
    <p> a character from the characters variable will be choosen to be drawn (appended to the asciiCharacters variable).</p></li>
</ul>
	<p>	Note: the contrast of the image will be changed to get a better result, you can increment the contrast using the contrast parameter in the fromCanvas function.</p>
	</div>
	<div class="col-lg-5" >
<figure >
  <center><figcaption>JS script</figcaption></center>
  <pre style="color: #e83e8c;background: #a0a0a038">
    <code >
	&lt;script&gt;
	var canvas = document.getElementById("myCanvasId");
	ascii.fromCanvas(canvas, 
		{
			contrast: 64,
			callback: function(asciiString)
			{
				// Do something with the asciiString
				asciiContainer.innerHTML = asciiString;
		   	}
		});
	&lt;script&gt;
    </code>
  </pre>
</figure>
</div>
</div>
