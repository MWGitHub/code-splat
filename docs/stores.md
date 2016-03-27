# Flux Stores

### ProjectStore

Holds a project detail, comments, and shallow file ids

##### Actions:
- `receiveAllProjects`
- `receiveSingleProject`
- `removeProject`

##### Listeners:
- `ProjectList`
- `ProjectDetail`

### FileStore

Holds file details, explanations, suggestions, and comments

##### Actions:
- `receiveAllFiles`
- `receiveSingleFile`
- `removeFile`

##### Listeners:
- `FileList`
- `FileDetail`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`

### SearchSuggestionStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchSuggestions`
