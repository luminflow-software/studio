import { cache } from '../../Cache.js';
import { tool } from '../Tool.js';

const blurRegex = /blur\(\s*([-\d.]+)px\s*\)/;

const BlurProperty = {
	getCurrentBlur() {
		if (!cache.ele) return 0;

		//reading blur from a single feGaussianBlur if present
		const filterNode = this.getFilterNode();
		if (filterNode) {
			const gaussians = this.getGaussianNodes(filterNode);
			if (gaussians.length === 1) {
				const raw = $(gaussians[0]).attr('stdDeviation');
				const parsed = parseFloat(raw);
				if (!Number.isNaN(parsed)) return parsed;
			}
		}

		return this.getCssBlur();
	},
	setBlur(value) {
		if (!cache.ele) return;

		const blur = Math.max(0, value);
		const filterNode = this.getFilterNode();
		const gaussians = filterNode ? this.getGaussianNodes(filterNode) : [];

		if (gaussians.length === 1) {
			$(gaussians[0]).attr('stdDeviation', blur);
			this.cleanCssBlur();
			tool.blur = blur;
			return blur;
		}

		//fallback to CSS blur when no single feGaussianBlur target exists
		const currentFilter = cache.ele.css('filter');
		const cleanedFilter = this.removeBlur(currentFilter);
		const nextFilter = blur
			? `${cleanedFilter ? `${cleanedFilter} ` : ''}blur(${blur}px)`
			: cleanedFilter || 'none';

		this.applyCssFilter(nextFilter);
		tool.blur = blur;

		return blur;
	},
	getFilterNode() {
		const filterAttr = cache.ele?.attr('filter');
		if (!filterAttr) return null;

		const match = filterAttr.match(/url\(\s*#?([^)]+)\)/) || filterAttr.match(/^#?(.+)/);
		if (!match || !match[1]) return null;

		const id = match[1].trim();
		const filter = document.getElementById(id);
		return filter && filter.tagName.toLowerCase() === 'filter' ? filter : null;
	},
	getGaussianNodes(filterNode) {
		return $(filterNode).find('feGaussianBlur').toArray();
	},
	getCssBlur() {
		const filter = cache.ele.css('filter');
		if (!filter || filter === 'none') return 0;

		const match = filter.match(blurRegex);
		return match && match[1] ? parseFloat(match[1]) || 0 : 0;
	},
	cleanCssBlur() {
		const current = cache.ele.css('filter');
		const cleaned = this.removeBlur(current);
		if (current !== cleaned) {
			this.applyCssFilter(cleaned || 'none');
		}
	},
	removeBlur(filterValue) {
		if (!filterValue || filterValue === 'none') return '';

		return filterValue.replace(/blur\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
	},
	applyCssFilter(filterVal) {
		// jQuery css plus direct style assignment to avoid edge cases where css() is ignored
		cache.ele.css('filter', filterVal);
		if (cache.ele[0]) {
			cache.ele[0].style.filter = filterVal;
		}
	}
};

export { BlurProperty };
