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

ActiveRecord::Schema.define(version: 20150903200807) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "attachment_limits", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.integer  "get_count"
    t.integer  "put_count"
    t.integer  "space_count"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "attachment_statuses", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.integer  "get_count",   default: 0
    t.integer  "put_count",   default: 0
    t.float    "space_count", default: 0.0
    t.uuid     "company_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "attachments", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "file_name"
    t.string   "file_extension"
    t.string   "file_link"
    t.text     "description"
    t.uuid     "event_id"
    t.uuid     "owner_id"
    t.uuid     "company_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "categories", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.uuid     "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "body"
    t.uuid     "commenter_id"
    t.uuid     "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "locked",           default: false
  end

  create_table "companies", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.uuid     "attachment_limit_id"
  end

  create_table "contacts", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "organization"
    t.text     "description"
    t.integer  "category"
    t.uuid     "owner_id"
    t.uuid     "company_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.uuid     "vendor_id"
  end

  create_table "event_categories", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "event_id"
    t.uuid     "category_id"
    t.decimal  "budget"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "event_contacts", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid "contact_id"
    t.uuid "event_id"
  end

  add_index "event_contacts", ["contact_id"], name: "index_event_contacts_on_contact_id", using: :btree
  add_index "event_contacts", ["event_id"], name: "index_event_contacts_on_event_id", using: :btree

  create_table "event_vendors", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid "vendor_id"
    t.uuid "event_id"
  end

  add_index "event_vendors", ["event_id"], name: "index_event_vendors_on_event_id", using: :btree
  add_index "event_vendors", ["vendor_id"], name: "index_event_vendors_on_vendor_id", using: :btree

  create_table "events", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.date     "start_date"
    t.date     "end_date"
    t.float    "budget"
    t.string   "location"
    t.uuid     "owner_id"
    t.uuid     "company_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.uuid     "client_id"
    t.integer  "status",      default: 1
    t.uuid     "parent_id"
  end

  create_table "expenses", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "event_category_id"
    t.uuid     "vendor_id"
    t.string   "name"
    t.text     "notes"
    t.decimal  "price"
    t.integer  "quantity"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.uuid     "sender_id",  null: false
    t.text     "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invitations", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "email"
    t.uuid     "company_id"
    t.uuid     "sender_id"
    t.uuid     "recipient_id"
    t.string   "token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "payments", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.date     "due_date"
    t.uuid     "expense_id"
    t.decimal  "amount"
    t.integer  "method"
    t.boolean  "paid"
    t.text     "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.uuid     "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tasks", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.uuid     "event_id"
    t.uuid     "owner_id"
    t.uuid     "company_id"
    t.date     "deadline"
    t.uuid     "assigned_to_id"
    t.integer  "status"
  end

  create_table "user_sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_sessions", ["session_id"], name: "index_user_sessions_on_session_id", using: :btree
  add_index "user_sessions", ["updated_at"], name: "index_user_sessions_on_updated_at", using: :btree

  create_table "users", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "company_id",                          null: false
    t.boolean  "company_admin",       default: false
    t.string   "email",                               null: false
    t.string   "crypted_password",                    null: false
    t.string   "password_salt",                       null: false
    t.string   "persistence_token",                   null: false
    t.string   "single_access_token",                 null: false
    t.string   "perishable_token",                    null: false
    t.integer  "login_count",         default: 0,     null: false
    t.integer  "failed_login_count",  default: 0,     null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.boolean  "verified",            default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["last_request_at"], name: "index_users_on_last_request_at", using: :btree
  add_index "users", ["persistence_token"], name: "index_users_on_persistence_token", using: :btree

  create_table "vendors", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.string   "location"
    t.string   "phone"
    t.uuid     "owner_id"
    t.uuid     "company_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.uuid     "primary_contact_id"
    t.text     "description"
  end

end
