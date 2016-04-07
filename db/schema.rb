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

ActiveRecord::Schema.define(version: 20160407132941) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "explanations", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "source_file_id", null: false
    t.text     "fragment",       null: false
    t.integer  "fragment_start", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "fragment_end",   null: false
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "front_page_items", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "project_id",  null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "front_page_items", ["project_id"], name: "index_front_page_items_on_project_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.uuid     "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "projects", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "title",                       null: false
    t.uuid     "author_id",                   null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "slug",                        null: false
    t.string   "language",   default: "ruby", null: false
  end

  add_index "projects", ["author_id"], name: "index_projects_on_author_id", using: :btree
  add_index "projects", ["slug"], name: "index_projects_on_slug", unique: true, using: :btree
  add_index "projects", ["title"], name: "index_projects_on_title", unique: true, using: :btree

  create_table "replies", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.text     "body",           null: false
    t.uuid     "author_id",      null: false
    t.uuid     "repliable_id",   null: false
    t.string   "repliable_type", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "replies", ["author_id"], name: "index_replies_on_author_id", using: :btree
  add_index "replies", ["repliable_type", "repliable_id"], name: "index_replies_on_repliable_type_and_repliable_id", using: :btree

  create_table "session_providers", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid   "user_id",    null: false
    t.string "provider",   null: false
    t.string "identifier", null: false
    t.string "token",      null: false
  end

  add_index "session_providers", ["token"], name: "index_session_providers_on_token", unique: true, using: :btree
  add_index "session_providers", ["user_id"], name: "index_session_providers_on_user_id", using: :btree

  create_table "source_files", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name",                        null: false
    t.uuid     "author_id",                   null: false
    t.uuid     "project_id",                  null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "slug",                        null: false
    t.string   "language",   default: "ruby", null: false
  end

  add_index "source_files", ["author_id"], name: "index_source_files_on_author_id", using: :btree
  add_index "source_files", ["name", "project_id"], name: "index_source_files_on_name_and_project_id", unique: true, using: :btree
  add_index "source_files", ["project_id", "slug"], name: "index_source_files_on_project_id_and_slug", unique: true, using: :btree
  add_index "source_files", ["project_id"], name: "index_source_files_on_project_id", using: :btree

  create_table "text_changes", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.text     "body"
    t.uuid     "author_id",       null: false
    t.uuid     "changeable_id",   null: false
    t.string   "changeable_type", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "text_changes", ["author_id"], name: "index_text_changes_on_author_id", using: :btree
  add_index "text_changes", ["changeable_type", "changeable_id"], name: "index_text_changes_on_changeable_type_and_changeable_id", using: :btree

  create_table "users", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "username",                    null: false
    t.string   "password_digest",             null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "email"
    t.integer  "score",           default: 0, null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
