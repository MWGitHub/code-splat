# CodeSplat

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: https://mw-rgc.herokuapp.com/

## Minimum Viable Product

CodeSplat is a code review site inspired by Rap Genius' annotation system built using Ruby on Rails and React.js.

CodeSplat allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account
- [ ] Log in / Log out
- [ ] Upload project files to generate code pages
- [ ] Create, read, edit, and delete code pages
- [ ] Organize code pages into projects
- [ ] Create, read, edit, and delete suggestions
- [ ] Create, read, edit, and delete replies
- [ ] Allow other users to vote on replies
- [ ] Link code pages to other code pages
- [ ] Apply styling to code

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 0: Setup
- [x] create new project
- [x] create documentation
- [x] set up production server

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Project Model, File Model, Changes Model, and JSON API (1 day)

**Objective:** Projects and files can be created, edited, and deleted. Changes are tracked for each action.

- [ ] create `Project` model
- [ ] create `File` model
- [ ] create `Change` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for projects (`ProjectsController`)
- [ ] jBuilder views for projects
- [ ] CRUD API for projects (`FilesController`)
- [ ] jBuilder views for files
- [ ] API for changes (`ChangesController`)
- [ ] jBuilder views for changes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Project/File/Changes CRUD (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each project component, building out the flux loop as needed.
  - [ ] `ProjectsIndex`
  - [ ] `ProjectIndexItem`
  - [ ] `ProjectForm`
- implement each files component, building out the flux loop as needed.
  - [ ] `FilesIndex`
  - [ ] `FileIndexItem`
  - [ ] `FileForm`
- implement each project component, building out the flux loop as needed.
  - [ ] `ChangesIndex`
  - [ ] `ChangeIndexItem`
  - [ ] `ChangeForm`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good and be responsive.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Project Comments, Files Comment, Explanations, Suggestions, and Votes (2 days)

**Objective:** Projects and files can be commented. Explanations can be made for lines in files. Comments, suggestions, and explanations can be voted on.

- [ ] create `Reply` model
- [ ] create `Explanation` model
- [ ] create `Vote` model
- [ ] CRUD API for projects (`RepliesController`)
- [ ] jBuilder views for projects
- [ ] CRUD API for projects (`ExplanationsController`)
- [ ] jBuilder views for files
- [ ] API for changes (`VotesController`)
- build out API, Flux loop, and components for:
  - [ ] Reply CRUD
  - [ ] Explanation CRUD
  - [ ] Vote CRUD
  - [ ] adding comments requires a file or project
  - [ ] viewing comments by file or project
  - [ ] viewing votes on comments, explanations, and suggestions
- Use CSS to style new views

### Phase 6: Allow Complex Styling in Code and text selection (1 day)

**Objective:** Code is highlighted and comments and lines can be selected for suggestions. Editor added to file code and explanations.

- [ ] add CodeMirror to allow syntax highlighting and editing
- [ ] highlight text in file code to create or edit explanations

### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make the site look better and be more usable

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] refactor code
- [ ] optimize slow requests
- [ ] check for memory leaks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
