#!/usr/bin/env bash
bundle install
npm install
bundle exec rake db:setup
bundle exec rake db:seed
apm install linter-eslint
apm enable linter-eslint
apm install pigments
apm enable pigments
apm install color-picker
apm enable color-picker
apm disable jshint
