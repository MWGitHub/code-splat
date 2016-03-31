# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160331013928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "projects", ["author_id"], name: "index_projects_on_author_id", using: :btree
  add_index "projects", ["title"], name: "index_projects_on_title", unique: true, using: :btree

  create_table "source_files", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "author_id",  null: false
    t.integer  "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "source_files", ["author_id"], name: "index_source_files_on_author_id", using: :btree
  add_index "source_files", ["name", "project_id"], name: "index_source_files_on_name_and_project_id", unique: true, using: :btree
  add_index "source_files", ["project_id"], name: "index_source_files_on_project_id", using: :btree

  create_table "text_changes", force: :cascade do |t|
    t.text     "body"
    t.integer  "author_id",       null: false
    t.integer  "changeable_id",   null: false
    t.string   "changeable_type", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "text_changes", ["author_id"], name: "index_text_changes_on_author_id", using: :btree
  add_index "text_changes", ["changeable_type", "changeable_id"], name: "index_text_changes_on_changeable_type_and_changeable_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "email",           null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
