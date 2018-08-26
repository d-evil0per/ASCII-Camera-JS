  // Author: Andrei Gheorghe (http://github.com/idevelop)

var ascii = (function() {
	function asciiFromCanvas(canvas, options) {
		// Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
		// Heavily modified by Andrei Gheorghe (http://github.com/idevelop)

		// var characters = (" .,:;i1tfLCG08@").split("");

		var characters = [
						"<span class='sh_1'> </span>",
						"<span class='sh_2'>.</span>",
						"<span class='sh_3'>,</span>", 
						"<span class='sh_4'>:</span>", 
						"<span class='sh_5'>;</span>", 
						"<span class='sh_6'>i</span>", 
						"<span class='sh_7'>1</span>", 
						"<span class='sh_8'>t</span>", 
						"<span class='sh_9'>f</span>", 
						"<span class='sh_10'>L</span>", 
						"<span class='sh_11'>C</span>", 
						"<span class='sh_12'>G</span>", 
						"<span class='sh_13'>0</span>", 
						"<span class='sh_14'>8</span>", 
						"<span class='sh_15'>@</span>"
						];




		// var characters = [
		// 				"<span style='background-color:#fff'> </span>",
		// 				"<span style='color:#fff'>.</span>",
		// 				"<span style='color:#F5F5F5'>,</span>", 
		// 				"<span style='color:#E0E0E0'>:</span>", 
		// 				"<span style='color:#D3D3D3'>;</span>", 
		// 				"<span style='color:#C0C0C0'>i</span>", 
		// 				"<span style='color:#B0B0B0'>1</span>", 
		// 				"<span style='color:#A0A0A0'>t</span>", 
		// 				"<span style='color:#888888'>f</span>", 
		// 				"<span style='color:#707070'>L</span>", 
		// 				"<span style='color:#606060'>C</span>", 
		// 				"<span style='color:#484848'>G</span>", 
		// 				"<span style='color:#303030'>0</span>", 
		// 				"<span style='color:#181818'>8</span>", 
		// 				"<span style='color:#000'>@</span>"
		// 				];

		// var characters = [
		// 				"<span id='sh_1' style='background-color:##76ff76'> </span>",
		// 				"<span id='sh_2' style='color:##3bff3b'>.</span>",
		// 				"<span id='sh_3' style='color:#00ff00'>,</span>", 
		// 				"<span id='sh_4' style='color:#00eb00'>:</span>", 
		// 				"<span id='sh_5' style='color:#00d800'>;</span>", 
		// 				"<span id='sh_6' style='color:#00c400'>i</span>", 
		// 				"<span id='sh_7' style='color:#00b100'>1</span>", 
		// 				"<span id='sh_8' style='color:#009d00'>t</span>", 
		// 				"<span id='sh_9' style='color:#008900'>f</span>", 
		// 				"<span id='sh_10' style='color:#007600'>L</span>", 
		// 				"<span id='sh_11' style='color:#006200'>C</span>", 
		// 				"<span id='sh_12' style='color:#004e00'>G</span>", 
		// 				"<span id='sh_13' style='color:#003b00'>0</span>", 
		// 				"<span id='sh_14' style='color:#002700'>8</span>", 
		// 				"<span id='sh_15' style='color:#001400'>@</span>"
		// 				];

		var context = canvas.getContext("2d");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;

		var asciiCharacters = "";

		// calculate contrast factor
		// http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
		var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

		var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
		for (var y = 0; y < canvasHeight; y += 2) { // every other row because letters are not square
			for (var x = 0; x < canvasWidth; x++) {
				// get each pixel's brightness and output corresponding character

				// var offset = (y * canvasWidth + x) * 4;
				var offset = (y * (canvasWidth * 4) + (x * 4));
				var color = getColorAtOffset(imageData.data, offset);

				// increase the contrast of the image so that the ASCII representation looks better
				// http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
				var contrastedColor = {
					red: bound(Math.floor((color.red - 128) * contrastFactor) + 128, [0, 255]),
					green: bound(Math.floor((color.green - 128) * contrastFactor) + 128, [0, 255]),
					blue: bound(Math.floor((color.blue - 128) * contrastFactor) + 128, [0, 255]),
				
					alpha: color.alpha
				};

				// calculate pixel brightness
				// http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
				var brightness = (0.299 * contrastedColor.red + 0.587 * contrastedColor.green + 0.114 * contrastedColor.blue) / 255;

				var character = characters[(characters.length - 1) - Math.round(brightness * (characters.length - 1))];

				asciiCharacters += character;
			}

			asciiCharacters += "\n";
		}

		options.callback(asciiCharacters);
	}

	function getColorAtOffset(data, offset) {
		return {
			red: data[offset],
			green: data[offset + 1],
			blue: data[offset + 2],
			alpha: data[offset + 3]
		};
	}

	function bound(value, interval) {
		return Math.max(interval[0], Math.min(interval[1], value));
	}

	return {
		fromCanvas: function(canvas, options) {
			options = options || {};
			options.contrast = (typeof options.contrast === "undefined" ? 8 : options.contrast);
			options.callback = options.callback || doNothing;

			return asciiFromCanvas(canvas, options);
		}
	};
})();

