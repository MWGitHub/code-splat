import ExplanationActions from '../actions/explanation-actions';

export default {
	fetchExplanations: function (sourceFileId, onSuccess) {
		$.ajax({
			type: 'GET',
			url: '/api/source_files/' + sourceFileId + '/explanations',
			dataType: 'json',
			success: function (data) {
				ExplanationActions.receiveExplanations(data);
				onSuccess && onSuccess(data);
			}
		});
	},

	createExplanation: function (sourceFileId, explanation, onSuccess) {
		$.ajax({
			type: 'POST',
			url: '/api/source_files/' + sourceFileId + '/explanations',
			dataType: 'json',
			data: {
				explanation: explanation
			},
			success: function (data) {
				ExplanationActions.receiveExplanation(data);
				onSuccess && onSuccess(data);
			}
		});
	},

	updateExplanation: function (id, explanation, onSuccess) {
		$.ajax({
			type: 'PATCH',
			url: '/api/explanations/' + id,
			dataType: 'json',
			data: {
				explanation: explanation
			},
			success: function (data) {
				ExplanationActions.receiveExplanation(data);
				onSuccess && onSuccess(data);
			}
		})
	},

	destroyExplanation: function (id, onSuccess) {
		$.ajax({
			type: 'DELETE',
			url: '/api/explanations/' + id,
			dataType: 'json',
			success: function (data) {
				ExplanationActions.removeExplanation(data);
				onSuccess && onSuccess(data);
			}
		})
	},

	fetchExplanationChanges: function (id) {
    $.ajax({
      type: 'GET',
      url: '/api/explanations/' + id + '/text_changes',
      dataType: 'json',
      success: function (data) {
        ExplanationActions.receiveSourceFileChanges(data);
      }
    });
  }
};
