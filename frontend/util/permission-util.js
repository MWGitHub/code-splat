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
		file: {
			create: function () {
				return checkPermission(window.codeSplat.thresholds.file.create);
			},
			update: function () {
				return checkPermission(window.codeSplat.thresholds.file.update);
			},
			destroy: function () {
				return checkPermission(window.codeSplat.thresholds.file.destroy);
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
		},
    explanation: {
			create: function () {
				return checkPermission(window.codeSplat.thresholds.explanation.create);
			},
			update: function () {
				return checkPermission(window.codeSplat.thresholds.explanation.update);
			},
			destroy: function () {
				return checkPermission(window.codeSplat.thresholds.explanation.destroy);
			}
		}
	}
};
