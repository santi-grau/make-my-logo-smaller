#Make my logo smaller!


###Client is always wrong, everyone knows that (besides him)

Have you ever wondered why did someone hired you as a design/development expert if they are constantly making every call? Make the logo bigger, the background lighter, that margin smaller...

This (conceptual) jquery plugin will change a set of css properties (see below) from a specific selector (or set of selectors) for a specific amount of time (days). The goal is to be able to make progressive changes (after deploying to production) in such a subtle way that even the client won't notice. Ever wanted to make that logo smaller? reduce a pixel every day until you get the dimensions that it **should have**.

###Take back control of your design…


Make my logo smaller will allow you to modify the following set of properties on any selector:

* background-color
* color
* top
* bottom
* left
* right
* width
* height
* font-size
* line-height
* letter-spacing
* padding-left
* padding-right
* padding-top
* padding-bottom
* margin-left
* margin-right
* margin-top
* margin-bottom
* min-width
* min-height
* max-width
* max-height

…and will do it from a certain date during a specific amount of days.

###Use

Include plugin in your site, somewhere after jQuery:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2 jquery.min.js"></script>
	<script src="path/to/jquery.make-my-logo-smaller.min.js"></script>
	
And you are ready to go:

	$('your-selector-name').mmls({
		property: "color",
		ini: "#000000",
		end: "#FFFFFF",
		from: "21/07/14",
		time: 15
	});

*We strongly suggest to change the plugin's name…

**property:** Name of the css property you want to change (see supported list)  

**ini:** Initial value that property should have (namely what the client wants) 

If property is "background-color" or "color" this data type must be a valid hex value (#FFF or #FFFFFF) otherwise, this data type should be an int.  

**end:** Final value that property should have (namely what you want) if property is "background-color" or "color" this data type must be a valid hex value (#FFF or #FFFFFF) otherwise, this data type should be an int.  

**from:** Date in which transformation should start (must have dd/mm/yy format)  

**time:** Number of days in which transformation should happen

###Examples

Modify the body background's color from pure white (#FFFFFF) to a light(est) gray, starting the 21st of july 2014 a step at a time for 30 days.

	$('body').mmls({
		property: "background-color",
		ini: "#FFFFFF",
		end: "#DEDEDE",
		from: "21/07/14",
		time: 30
	});
	
Modify the logo's size from 300x200 px to 180x120 px, starting the 21st of july 2014 a step at a time for 30 days.
	
	$('#logo').mmls({ property: "width", ini: "300", end: "180", from: "21/07/14", time: 30}).mmls({ property: "height", ini: "200", end: "120", from: "21/07/14", time: 30});
		
(Yes, you'll have to call the plugin a time per property for now, I know...).

###License
Licensed under the MIT License