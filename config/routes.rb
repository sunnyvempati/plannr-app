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
  post '/users/mass_delete', to: 'users#mass_delete'

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
  get 'events/:event_id/search_other_contacts', to: 'contacts#search_contacts_not_in_event'
  get 'events/:event_id/search_other_vendors', to: 'vendors#search_vendors_not_in_event'
  get 'events/:event_id/search_event_contacts', to: 'event_contacts#search'
  get 'events/:event_id/search_event_vendors', to: 'event_vendors#search'
  get 'events/:event_id/search_event_tasks', to: 'tasks#search_in_events'
  get 'events/:event_id/search_event_attachments', to: 'attachments#search_in_events'
  get 'search_tasks', to: 'tasks#search'
  get 'search_users', to: 'users#search'
  get 'search_clients', to: 'contacts#search_clients'
  get 'search_contacts', to: 'contacts#search'
  get 'search_events', to: 'events#search'
  get 'search_vendors', to: 'vendors#search'


  # event_contacts
  post 'events/:event_id/contacts', to:'event_contacts#create'
  post 'events/:event_id/contacts/mass_delete', to:'event_contacts#mass_delete'
  get 'events/:event_id/contacts', to:'event_contacts#contacts'
  get 'contacts/events', to:'event_contacts#events'

  # event tasks
  get 'events/:event_id/tasks', to:'tasks#event_tasks'
  post '/tasks/mass_delete', to:'tasks#mass_destroy'

  # event_vendors
  post 'events/:event_id/vendors', to:'event_vendors#create'
  get 'events/:event_id/vendors', to:'event_vendors#vendors'
  post 'events/:event_id/vendors/mass_delete', to:'event_vendors#mass_delete'

  # event attachments
  get 'events/:event_id/attachments/new', to:'attachments#quick_create'
  get 'events/:event_id/attachments', to: 'attachments#event_attachments'
  post 'events/:event_id/attachments/mass_delete', to:'attachments#mass_destroy'
  post 'events/:event_id/attachments/', to: 'attachments#create'


  # contacts
  post '/contacts/quick_create', to: 'contacts#quick_create'
  post '/contacts/mass_delete', to:'contacts#mass_destroy'

  # TODO: specify Event routes
  post 'destroy_events', to: 'events#mass_delete'

  # tasks
  get 'user_tasks', to: 'tasks#for_user'

  resources :tasks, :events, :invitations, :users, :profiles, :vendors, :contacts

   # vendors
  post '/vendors/search', to: 'vendors#search'
  post '/vendors/mass_delete', to:'vendors#mass_destroy'

  # attachments
  resources :attachments, only: [:index, :new, :create, :destroy]

  # comments
  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'

end
