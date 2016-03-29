#!/usr/bin/env bash
bundle install
npm install
bundle exec rake db:setup
apm install linter-eslint
apm enable linter-eslint
apm disable jshint
