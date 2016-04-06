import WebActions from '../actions/web-actions';
import SearchActions from '../actions/search-actions';

export default {
  fetchProjects: function (queries, onSuccess) {
    $.ajax({
      type: 'GET',
      url: '/api/projects',
      dataType: 'json',
			data: queries || {},
      success: function (data) {
        WebActions.receiveProjects(data);
				onSuccess && onSuccess(data);
      }
    });
  },

  fetchProject: function (slug, onSuccess) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + slug,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProject(data);
				onSuccess && onSuccess(data);
      }
    });
  },

  createProject: function (project, onSuccess) {
    $.ajax({
      type: 'POST',
      url: '/api/projects',
      dataType: 'json',
      data: {
        project: project
      },
      success: function (data) {
        WebActions.receiveProject(data);
        onSuccess && onSuccess(data);
      }
    });
  },

  updateProject: function (id, project, onSuccess) {
    $.ajax({
      type: 'PATCH',
      url: '/api/projects/' + id,
      dataType: 'json',
      data: {
        project: project
      },
      success: function (data) {
        WebActions.receiveProject(data);
        onSuccess && onSuccess(data);
      }
    });
  },

  destroyProject: function (id) {
    $.ajax({
      type: 'DELETE',
      url: '/api/projects/' + id,
      dataType: 'json',
      success: function (data) {
        WebActions.removeProject(data);
      }
    });
  },

  fetchProjectChanges: function (slug) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + slug + '/text_changes',
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProjectChanges(data);
      }
    });
  },

	fetchProjectReplies: function (id) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/' + id + '/replies',
			dataType: 'json',
			success: function (data) {
				WebActions.receiveProjectReplies(data);
			}
		})
	},

	createProjectReply: function (id, reply) {
		$.ajax({
			type: 'POST',
			url: '/api/projects/' + id + '/replies',
			dataType: 'json',
			data: {
				reply: reply
			},
			success: function (data) {
				WebActions.receiveProjectReply(data);
			}
		})
	},



  fetchSourceFile: function (projectSlug, slug, onSuccess) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + projectSlug + '/source_files/' + slug,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveSourceFile(data);
				onSuccess && onSuccess(data);
      }
    });
  },

  createSourceFile: function (projectSlug, sourceFile, onSuccess) {
    $.ajax({
      type: 'POST',
      url: '/api/projects/' + projectSlug + '/source_files',
      dataType: 'json',
      data: {
        source_file: sourceFile
      },
      success: function (data) {
        WebActions.receiveSourceFile(data);
        onSuccess && onSuccess(data);
      }
    });
  },

  updateSourceFile: function (projectSlug, fileSlug, sourceFile, onSuccess) {
    $.ajax({
      type: 'PATCH',
      url: '/api/projects/' + projectSlug + '/source_files/' + fileSlug,
      dataType: 'json',
      data: {
        source_file: sourceFile
      },
      success: function (data) {
        WebActions.receiveSourceFile(data);
        onSuccess && onSuccess(data);
      }
    });
  },

  destroySourceFile: function (projectSlug, fileSlug) {
    $.ajax({
      type: 'DELETE',
      url: '/api/projects/' + projectSlug + '/source_files/' + fileSlug,
      dataType: 'json',
      success: function (data) {
        WebActions.removeSourceFile(data);
      }
    });
  },

  fetchSourceFileChanges: function (projectSlug, fileSlug) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + projectSlug + '/source_files/' +
        fileSlug + '/text_changes',
      dataType: 'json',
      success: function (data) {
        WebActions.receiveSourceFileChanges(data);
      }
    });
  },

	fetchSourceFileReplies: function (id, onSuccess) {
		$.ajax({
			type: 'GET',
			url: '/api/source_files/' + id + '/replies',
			dataType: 'json',
			success: function (data) {
				WebActions.receiveSourceFileReplies(data);
				onSuccess && onSuccess(data);
			}
		})
	},

	createSourceFileReply: function (id, reply) {
		$.ajax({
			type: 'POST',
			url: '/api/source_files/' + id + '/replies',
			dataType: 'json',
			data: {
				reply: reply
			},
			success: function (data) {
				WebActions.receiveSourceFileReply(data);
			}
		})
	},




	destroyReply: function (id) {
		$.ajax({
      type: 'DELETE',
      url: '/api/replies/' + id,
      dataType: 'json',
      success: function (data) {
        WebActions.removeReply(data);
      }
    });
	},



	fetchFrontPageItems: function () {
		$.ajax({
			type: 'GET',
			url: '/api/front_page_items',
			dataType: 'json',
			success: function (data) {
				WebActions.receieveFrontPageItems(data);
			}
		});
	},

	fetchExplanations: function (sourceFileId) {
		$.ajax({
			type: 'GET',
			url: '/api/source_files/' + sourceFileId + '/explanations',
			dataType: 'json',
			success: function (data) {
				WebActions.receiveExplanations(data);
			}
		});
	},

	createExplanation: function (sourceFileId, explanation) {
		$.ajax({
			type: 'POST',
			url: '/api/source_files/' + sourceFileId + '/explanations',
			dataType: 'json',
			data: {
				explanation: explanation
			},
			success: function (data) {
				WebActions.receiveExplanation(data);
			}
		});
	},

	searchBar: function (query) {
		$.ajax({
      type: "GET",
      url: "/api/searches",
      dataType: "json",
      data: {query: query, page: 1},
      success: function (response) {
        SearchActions.receiveBarResults(response);
      }
    });
	},

	search: function (query, page, onSuccess) {
		$.ajax({
      type: "GET",
      url: "/api/searches",
      dataType: "json",
      data: {query: query, page: page},
      success: function (response) {
        SearchActions.receiveResults(response);
				onSuccess && onSuccess(response);
      }
    });
	}
};
