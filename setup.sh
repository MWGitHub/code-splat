#!/usr/bin/env bash
bundle install
npm install
git config --local user.name mike
git config --local user.email mwwmail@gmail.com
git remote add heroku https://git.heroku.com/mw-rgc.git
heroku login
bundle exec rake db:setup
bundle exec rake db:seed
apm install linter-eslint
apm enable linter-eslint
apm install pigments
apm enable pigments
apm install color-picker
apm enable color-picker
apm disable jshint
apm install react
apm enable react
apm install atom-ternjs
apm enable atom-ternjs
apm install docblockr
apm enable docblockr
