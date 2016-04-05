import PermissionConstants from '../constants/permission-constants';
import SessionStore from '../stores/session';

function checkPermission(permission) {

}

export default {
	/**
	 * Checks if the user has permission to do an action.
	 * @type {Object|string} item the item to check, if it's an object it
	 *											 requires an author_id key, else uses it as
	 *											 the type.
	 * @type {string|null} permission the permission type to check against.
	 */
	hasPermission: function (item, permission) {
		if (!SessionStore.isLoggedIn()) return false;

		if (!permission) return true;

		switch (permission) {

		}
	}
};
