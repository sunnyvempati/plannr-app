class Consolidate0312 < ActiveRecord::Migration
  def change
    create_table :users, id: :uuid do |t|
      t.string    :email,               :null => false
      t.string    :crypted_password,    :null => false
      t.string    :password_salt,       :null => false
      t.string    :persistence_token,   :null => false
      t.string    :single_access_token, :null => false
      t.string    :perishable_token,    :null => false

      t.integer   :login_count,         :null => false, :default => 0
      t.integer   :failed_login_count,  :null => false, :default => 0
      t.datetime  :last_request_at
      t.datetime  :current_login_at
      t.datetime  :last_login_at
      t.string    :current_login_ip
      t.string    :last_login_ip
      t.timestamps null: false
    end

    create_table :profiles, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :planner
      t.uuid :user_id

      t.timestamps
    end

    create_table :events, id: :uuid do |t|
      t.string :name
      t.string :client_name
      t.date :start_date
      t.date :end_date
      t.float :budget
      t.string :location
      t.text :notes
      t.uuid :user_id
      t.text :description

      t.timestamps
    end

    create_table :user_sessions do |t|
      t.string :session_id, :null => false
      t.text :data
      t.timestamps
    end

    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :deadline

      t.timestamps null: false
    end

    add_index :user_sessions, :session_id
    add_index :user_sessions, :updated_at

    add_index :users, :email
    add_index :users, :persistence_token
    add_index :users, :last_request_at
  end
end
