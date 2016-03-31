import WebActions from '../actions/web-actions';

export default {
  fetchProjects: function () {
    $.ajax({
      type: 'GET',
      url: '/api/projects',
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProjects(data);
      }
    });
  },

  fetchProject: function (slug) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + slug,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProject(data);
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

  updateProject: function (slug, project, onSuccess) {
    $.ajax({
      type: 'PATCH',
      url: '/api/projects/' + slug,
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

  destroyProject: function (slug) {
    $.ajax({
      type: 'DELETE',
      url: '/api/projects/' + slug,
      dataType: 'json',
      success: function (data) {
        WebActions.removeProject(data);
      }
    });
  },

  fetchProjectChanges: function (id) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + id + '/text_changes',
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProjectChanges(data);
      }
    });
  },



  fetchSourceFile: function (id) {
    $.ajax({
      type: 'GET',
      url: '/api/source_files/' + id,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveSourceFile(data);
      }
    });
  },

  createSourceFile: function (projectId, sourceFile) {
    $.ajax({
      type: 'POST',
      url: '/api/projects/' + projectId + '/source_files',
      dataType: 'json',
      data: {
        source_file: sourceFile
      },
      success: function (data) {
        WebActions.receiveSourceFile(data);
      }
    });
  },

  updateSourceFile: function (sourceFile) {
    $.ajax({
      type: 'POST',
      url: '/api/source_files/' + sourceFile.id,
      dataType: 'json',
      data: {
        source_file: sourceFile
      },
      success: function (data) {
        WebActions.receiveSourceFile(data);
      }
    });
  },

  destroySourceFile: function (id) {
    $.ajax({
      type: 'DELETE',
      url: '/api/source_files/' + sourceFile.id,
      dataType: 'json',
      data: {
        source_file: sourceFile
      },
      success: function (data) {
        WebActions.removeSourceFile(data);
      }
    });
  },

  fetchSourcefileChanges: function (id) {
    $.ajax({
      type: 'GET',
      url: '/api/source_files/' + id + '/text_changes',
      dataType: 'json',
      success: function (data) {
        WebActions.receiveSourceFileChanges(data);
      }
    });
  },
};
