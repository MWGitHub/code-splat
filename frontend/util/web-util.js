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



  fetchSourceFile: function (projectSlug, slug) {
    $.ajax({
      type: 'GET',
      url: '/api/projects/' + projectSlug + '/source_files/' + slug,
      dataType: 'json',
      success: function (data) {
        WebActions.receiveSourceFile(data);
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
