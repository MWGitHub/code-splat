import SessionStore from '../stores/session';

function checkPermission(threshold) {
	if (!SessionStore.isLoggedIn()) return false;

	return SessionStore.getUser().score >= threshold;
}

export default {
	hasPermission: {
		project: {
			create: function () {
				return checkPermission(window.codeSplat.thresholds.project.create);
			},
			update: function () {
				return checkPermission(window.codeSplat.thresholds.project.update);
			},
			destroy: function () {
				return checkPermission(window.codeSplat.thresholds.project.destroy);
			}
		},
		reply: {
			create: function () {
				return checkPermission(window.codeSplat.thresholds.reply.create);
			},
			update: function () {
				return checkPermission(window.codeSplat.thresholds.reply.update);
			},
			destroy: function () {
				return checkPermission(window.codeSplat.thresholds.reply.destroy);
			}
		}
	}
};
