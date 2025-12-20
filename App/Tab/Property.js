/** This contains all functions pertaining to the Properties Tab */

import { cache } from '../Cache.js';
import { ui } from '../UI.js';

import { tool } from './Tool.js';
import { BlurProperty } from './Property/Blur.js';

var property = {
	dynamicUI: function () {

	},
	colorTo: 'stroke', // What the color applies to
	showOptions: function () {

	},
	getBaseValue: function (label) {
		if (!cache.ele) return 0;

		switch (label) {
			case 'blur':
				//Seed scrubber with existing blur from SVG filter or CSS
				return BlurProperty.getCurrentBlur();
			case 'stroke':
			default:
				return 0;
		}
	},
	value: 0,
	setNumValue: function () { //Change the value of a property
		if (!cache.ele || !this.scrubberTo) return;
		
		var propertyBtn = this.scrubberTo;
		var valueChange;
		var scrubAmount = 0;
		var propertyLabel = propertyBtn.attr('aria-label');

		if (!$('.propertyScrubber').hasClass('down')) {
			valueChange = ui.location(propertyBtn, 'top') - cache.cursor[1];
		} else {
			valueChange = cache.cursor[1] - ui.location(propertyBtn, 'bottom');
		}

		switch (propertyLabel) {
			case 'stroke':
				if (cache.ele.attr('stroke-opacity') == '0') {
					cache.ele.attr('stroke-opacity', 1);
				}
				valueChange = this.value + valueChange;
				var value;

				value = valueChange;
				scrubAmount = value;
				if (scrubAmount < 0) {
					scrubAmount = 0;
				}
				if (scrubAmount > 190)
					scrubAmount = 190;
					
				if (CSS.supports('stroke-width', value)) {
					cache.ele.attr('stroke-width', value);
					if (value < 10) {
						if (value != 0) {
							value = value.toFixed(1);
						}
					}
					$('.propertyScrubber').attr({
						'data-value': value
					}).removeClass('smallText');
					$('.scrub').css({
						'height': scrubAmount
					});
					tool.strokeWidth = value;
					break;
				}
				break;
			case 'blur':
				var blurValue = this.value + valueChange;
				blurValue = blurValue < 0 ? 0 : blurValue;
				scrubAmount = blurValue;
				if (scrubAmount > 190) {
					scrubAmount = 190;
				}
				$('.scrub').css({
					'height': scrubAmount
				});
				var formattedBlur = blurValue;
				if (formattedBlur < 10 && formattedBlur !== 0) {
					formattedBlur = formattedBlur.toFixed(1);
				} else {
					formattedBlur = Math.round(formattedBlur);
				}
				$('.propertyScrubber').attr({
					'data-value': formattedBlur + 'px'
				}).removeClass('smallText');
				BlurProperty.setBlur(blurValue);
				break;
			default:
				$('.propertyScrubber').attr({
					'data-value': 'stroke width'
				}).addClass('smallText');
		}
	}
}

export { property }
