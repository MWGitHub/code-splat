# Phase 2: Flux Architecture and Project/File/Changes CRUD (2 days)

## Rails
### Models

### Controllers
* Api::ChangesController (create, destroy, index, show, update)

### Views
* changes/index.json.jbuilder
* changes/show.json.jbuilder

## Flux
### Views (React Components)
* ProjectIndex
  - ProjectIndexItem
* ProjectForm

* FileIndex
  - FileIndexItem
* FileForm

* ChangesIndex
  - ChangeIndexItem

### Stores
* Project
* File

### Actions
* ApiActions.receiveAllProjects -> triggered by ApiUtil
* ApiActions.receiveSingleProject
* ApiActions.deleteProject
* ProjectActions.fetchAllProjects -> triggers ApiUtil
* ProjectActions.fetchSingleProject
* ProjectActions.createProject
* ProjectActions.editProject
* ProjectActions.destroyProject

* ApiActions.receiveAllFiles -> triggered by ApiUtil
* ApiActions.receiveSingleFile
* ApiActions.deleteFile
* FileActions.fetchAllFiles -> triggers ApiUtil
* FileActions.fetchSingleFile
* FileActions.createFile
* FileActions.editFile
* FileActions.destroyFile

### ApiUtil
* ApiUtil.fetchAllProjects
* ApiUtil.fetchSingleProject
* ApiUtil.createProject
* ApiUtil.editProject
* ApiUtil.destroyProject

* ApiUtil.fetchAllFiles
* ApiUtil.fetchSingleFile
* ApiUtil.createFile
* ApiUtil.editFile
* ApiUtil.destroyFile

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
