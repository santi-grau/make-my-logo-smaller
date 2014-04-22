/*!
 * jQuery.make-my-logo-smaller
 * Licensed under MIT
 * @projectDescription This (conceptual) jquery plugin will change a set of css properties (see below) from a specific selector (or set of selectors) during a specific amount of time (days).
 */
 (function($) {
	$.fn.mmls = function( options ) {
		var settings = $.extend({
			element: this,
			property: null,
			ini: null,
			end: null,
			from: null,
			time: null
		}, options );
		if(!settings.property) $.error('[ Make my logo smalller -> missing property]');
		if(!settings.ini) $.error('[ Make my logo smalller -> missing ini]');
		if(!settings.end) $.error('[ Make my logo smalller -> missing end]');
		if(!settings.from) $.error('[ Make my logo smalller -> missing from]');
		if(!settings.time) $.error('[ Make my logo smalller -> missing time]');
		if(!settings.property || !settings.ini || !settings.end || !settings.from || !settings.time) return;
		// Check if dateFrom has started or change process has ended
		var changeVal = 0;
		var date = new Date(settings.from.split("/")[1] + '/' + settings.from.split("/")[0] + '/' + settings.from.split("/")[2]);
		var dateEnd = new Date();
		dateEnd.setDate(date.getDate() + settings.time);
		//var dateEnd = new Date(mm+'/'+dd+'/'+y);
		var today = new Date();
		if(date > today){ // Not started
			return;
		}else if(date < today && today < dateEnd){ // We're changing
			changeVal = ((today - date) / 86400000) / settings.time;
		}else{
			changeVal = 1;
		}
		// Check if property is valid
		if(
			settings.property !== 'background-color' &&
			settings.property !== 'color' &&
			settings.property !== 'top' &&
			settings.property !== 'bottom' &&
			settings.property !== 'left' &&
			settings.property !== 'right' &&
			settings.property !== 'width' &&
			settings.property !== 'height' &&
			settings.property !== 'font-size' &&
			settings.property !== 'line-height' &&
			settings.property !== 'letter-spacing' &&
			settings.property !== 'padding-left' &&
			settings.property !== 'padding-right' &&
			settings.property !== 'padding-top' &&
			settings.property !== 'padding-bottom' &&
			settings.property !== 'margin-left' &&
			settings.property !== 'margin-right' &&
			settings.property !== 'margin-top' &&
			settings.property !== 'margin-bottom' &&
			settings.property !== 'min-width' &&
			settings.property !== 'min-height' &&
			settings.property !== 'max-width' &&
			settings.property !== 'max-height'
		) {
			$.error('Property not supported');
			return;
		}
		// Check if from and to are valid for selected property
		if(settings.property == 'background-color' || settings.property == 'color'){
			if(!(/^#[0-9A-F]{6}$/i.test(settings.ini) || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(settings.ini)) || !(/^#[0-9A-F]{6}$/i.test(settings.end) || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(settings.end))){
				$.error('From and to must be valid Hex of type String for the property ' + settings.property);
				return;
			}
		}else{
			if(isNaN(settings.ini) || isNaN(settings.end)){
				$.error('From and to must be numbers for the property ' + settings.property);
				return;
			}
		}
		// If color property...
		if(settings.property == 'background-color' || settings.property == 'color'){
			var col1RGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.ini);
			var col2RGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.end);
			var col1 = { r: parseInt(col1RGB[1], 16), g: parseInt(col1RGB[2], 16), b: parseInt(col1RGB[3], 16)};
			var col2 = { r: parseInt(col2RGB[1], 16), g: parseInt(col2RGB[2], 16), b: parseInt(col2RGB[3], 16)};
			var avgRed = (col2.r - col1.r) * changeVal;
			var avgGre = (col2.g - col1.g) * changeVal;
			var avgBlu = (col2.b - col1.b) * changeVal;
			var redVal = Math.floor(col1.r + avgRed);
			var greVal = Math.floor(col1.g + avgGre);
			var bluVal = Math.floor(col1.b + avgBlu);
			var value = "#" + ((1 << 24) + (redVal << 16) + (greVal << 8) + bluVal).toString(16).slice(1);
		}
		// If not color property
		if(settings.property !== 'background-color' && settings.property !== 'color'){
			value = settings.ini + ((settings.end - settings.ini)*changeVal);
		}
		return this.css(settings.property, value);
	};
}(jQuery));