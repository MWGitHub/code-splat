# CodeSplat

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: https://mw-rgc.herokuapp.com/

## Minimum Viable Product

CodeSplat is a code review site inspired by Rap Genius' annotation system built using Ruby on Rails and React.js.

CodeSplat allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account
- [x] Log in / Log out
- [ ] ~~Upload project files to generate code pages~~
- [ ] Upload images in replies and suggestions
- [x] Create, read, edit, and delete code pages
- [x] Organize code pages into projects
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
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Project Model, File Model, Changes Model, and JSON API (1 day)

**Objective:** Projects and files can be created, edited, and deleted. Changes are tracked for each action.

- [x] create `Project` model
- [x] create `File` model
- [x] create `Change` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for projects (`ProjectsController`)
- [x] jBuilder views for projects
- [x] CRUD API for projects (`FilesController`)
- [x] jBuilder views for files
- [x] API for changes (`ChangesController`)
- [x] jBuilder views for changes
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Project/File/Changes CRUD (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each project component, building out the flux loop as needed.
  - [x] `ProjectsIndex`
  - [x] `ProjectIndexItem`
  - [x] `ProjectForm`
- implement each files component, building out the flux loop as needed.
  - [x] `FilesIndex`
  - [x] `FileIndexItem`
  - [x] `FileForm`
- implement each project component, building out the flux loop as needed.
  - [x] `TextChangesIndex`
  - [x] `TextChangeIndexItem`
  - [ ] ~~`TextChangeForm`~~

### Phase 4: Start Styling and add Pages(0.5 days)

**Objective:** Existing pages (including sign up/sign in) will look good and be responsive.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles
- [ ] style home page
- [ ] style project page
- [ ] style file page

### Phase 5: Project Comments, Files Comment, Explanations, Suggestions, and Votes (2 days)

**Objective:** Projects and files can be commented. Explanations can be made for lines in files. Comments, suggestions, and explanations can be voted on.

- [x] create `Reply` model
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
- [ ] add user page
- [ ] add user karma
- [ ] add search
- [ ] add pagination
- [ ] refactor code
- [ ] optimize slow requests
- [ ] check for memory leaks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

### TODO
- [ ] fix not truly logging in on account creation on Heroku
