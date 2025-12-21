import { cache } from "../../Cache.js";
import { ui } from "../../UI.js";
import { property } from "../Property.js";

import { Opacityproperty } from "./Opacity.js";

$('[aria-label="opacity"]').mousedown(function() {
	cache.btnAction = 'opacity';
	cache.swipe = true;
	property.scrubberTo = $(this);
	cache.btnArea = {
		left: $(this).offset().left,
		right: $(this).offset().left + $(this).width(),
		top: $(this).offset().top,
		bottom: $(this).offset().top + $(this).height()
	};
	// Capture the current opacity value based on toggle state
	if (cache.ele) {
		var currentOpacity;
		if ($(this).hasClass('toggled')) {
			// Toggled: get stroke-opacity or fill-opacity
			var strokeToggled = $('[aria-label="stroke"]').hasClass('toggled');
			var fillToggled = $('[aria-label="fill"]').hasClass('toggled');
			
			if (strokeToggled && !fillToggled) {
				currentOpacity = cache.ele.attr('stroke-opacity');
			} else if (fillToggled && !strokeToggled) {
				currentOpacity = cache.ele.attr('fill-opacity');
			} else if (strokeToggled && fillToggled) {
				// Both toggled, use stroke-opacity as base
				currentOpacity = cache.ele.attr('stroke-opacity');
			} else {
				// Fallback to element opacity if no stroke/fill selected
				currentOpacity = cache.ele.css('opacity');
			}
		} else {
			// Not toggled: get element opacity
			currentOpacity = cache.ele.css('opacity');
		}
		property.value = currentOpacity ? parseFloat(currentOpacity) : 1;
	}
	console.log("opacity pressed");
}).mouseleave(function(e) {
	if (cache.swipe && !$('.propertyScrubber').hasClass('show')) {
		cache.start = [e.clientX, e.clientY];
		if (e.clientX > cache.btnArea.left && e.clientX < cache.btnArea.right) {
			cache.start = [e.clientX, e.clientY];
			if (e.clientY < cache.btnArea.top + 5) {
				ui.scrubber(true);
			}
			if (e.clientY > cache.btnArea.bottom - 5) {
				ui.scrubber(true, 'down');
			}
			// Initialize the scrubber display with current opacity
			if (cache.ele && $(e.target).attr('aria-label') === 'opacity') {
				var currentOpacity = parseFloat(cache.ele.css('opacity')) || 1;
				var displayValue = (currentOpacity * 100).toFixed(0) + '%';
				var scrubAmount = currentOpacity * 190;
				$('.propertyScrubber').attr({
					'data-value': displayValue
				}).removeClass('smallText');
				$('.scrub').css({
					'height': scrubAmount
				});
			}
		}
		property.setNumValue();
	}
});

$(document).mouseup(function() {
	cache.btnAction = '';
	cache.swipe = false;
});