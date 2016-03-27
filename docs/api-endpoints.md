# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Projects

- `GET /api/projects`
  - Projects index/search
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/projects/:id/files`
  - Project files search
  - Index of all files for a project
- `GET /api/projects/:id/replies`
  - Index of all replies for a project

### Files

- `GET /api/files`
  - Files search
- `POST /api/files`
- `GET /api/files/:id`
- `PATCH /api/files/:id`
- `DELETE /api/files/:id`
- `GET /api/files/:id/replies`
  - Index of all replies for a file
- `GET /api/files/:id/explanations`
  - Explanations for a file

### Replies

- `GET /api/replies`
- `POST /api/replies`
- `GET /api/replies/:id`
- `PATCH /api/replies/:id`
- `DELETE /api/replies/:id`

### Explanations

- `POST /api/files/:id/explanations`
- `GET /api/explanations/:id`
- `PATCH /api/explanations/:id`
- `DELETE /api/explanations/:id`
- `GET /api/explanations/:id/suggestions`
  - Suggestions for an explanation

### Suggestions

- `POST /api/explanations/:id/suggestions`
- `GET /api/explanations/:id`
- `PATCH /api/explanations/:id`
- `DELETE /api/explanations/:id`
