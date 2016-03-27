# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## projects
id              integer       not null, pk
title           string        not null
author_id       integer       not null, fk (users)
description     text          

## files
id              integer       not null, pk
name            string        not null
author_id       integer       not null
project_id      integer       fk (projects)

## replies
id              integer       not null, pk
body            text          not null
author_id       integer       not null
item_id         integer       not null, fk (polymorphic)

## explanations
id              integer       not null, pk
body            text          not null
file_id         integer       not null, fk (files)

## changes
id              integer       not null, pk
body            text          
item_id         integer       not null, fk (polymorphic)

## votes
id              integer       not null, pk
weight          integer       not null
user_id         integer       not null
item_id         integer       fk (polymorphic)
