export default {
	hasAncestor: function (node, ancestor) {
		let ancestorFound = false;
		let parent = node;
		while (parent) {
			if (parent === ancestor) {
				ancestorFound = true;
				break;
			}
			parent = parent.parentNode;
		}
		return ancestorFound;
	}
};
