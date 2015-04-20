Rails.application.routes.draw do
  root "events#index"

  # login/logout
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # sign up
  get 'sign_up', to: 'users#new'
  post 'sign_up', to: 'users#create'
  post 'toggle_admin', to: 'users#toggle_admin'
  post 'destroy_users', to: 'users#mass_destroy'

  # password reset
  get 'reset_password_request', to: 'password_resets#new'
  post 'reset_password_request', to: 'password_resets#create'
  get 'reset_password', to: 'password_resets#edit'
  post 'reset_password', to: 'password_resets#update'

  # invitation
  post 'resend_invitation', to: 'invitations#resend'

  # company
  get 'company', to: 'companies#show'

  # searchable event endpoints
  get 'events/:id/other_contacts', to: 'contacts#contacts_not_in_event'
  get 'events/:event_id/search_other_contacts', to: 'contacts#search_contacts_not_in_event'
  get 'events/:id/other_vendors', to: 'vendors#vendors_not_in_event'
  get 'events/:event_id/search_other_vendors', to: 'vendors#search_vendors_not_in_event'

  # event_contacts
  post 'events/:event_id/contacts', to:'event_contacts#create'
  post 'events/:event_id/contacts/mass_delete', to:'event_contacts#mass_delete'
  get 'events/:event_id/contacts', to:'event_contacts#contacts'

  # event tasks
  get 'events/:event_id/tasks', to:'tasks#event_tasks'

  # event_vendors
  post 'events/:event_id/vendors', to:'event_vendors#create'
  post 'events/:event_id/vendors/mass_delete', to:'event_vendors#mass_delete'
  get 'events/:event_id/vendors', to:'event_vendors#vendors'

  # contacts
  post '/contacts/quick_create', to: 'contacts#quick_create'

  # TODO: specify Event routes

  resources :tasks, :events, :invitations, :users, :profiles, :vendors, :contacts
end
