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

  fetchProject: function (id) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + id,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveProject(data);
      }
    });
  },

  createProject: function (project) {
    $.ajax({
      type: 'POST',
      url: '/api/projects',
      dataType: 'json',
      data: {
        project: project
      },
      success: function (data) {
        WebActions.receiveProject(data);
      }
    });
  },

  updateProject: function (project) {
    $.ajax({
      type: 'POST',
      url: '/api/projects/' + project.id,
      dataType: 'json',
      data: {
        project: project
      },
      success: function (data) {
        WebActions.receiveProject(data);
      }
    });
  },

  destroyProject: function (id) {
    $.ajax({
      type: 'DELETE',
      url: '/api/projects/' + project.id,
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
