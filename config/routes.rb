Rails.application.routes.draw do
  root 'start#new'

  # login/logout
  # get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
  post 'profile', to: 'profiles#create'

  # sign up
  post 'sign_up', to: 'users#create'
  get 'sign_up', to: 'users#new'

  # post 'toggle_admin', to: 'users#toggle_admin'
  # post '/users/mass_delete', to: 'users#mass_delete'

  # # password reset
  post 'reset_password_request', to: 'password_resets#create'
  post 'reset_password', to: 'password_resets#update'

  # # email verification
  post 'verify', to: 'user_verifications#verify'

  # users
  resource :users, only: [:index, :create]
  get 'users/:id', to: 'users#show'

  # events
  resources :events, only: [:index, :create, :update]
  post 'destroy_events', to: 'events#mass_delete'

  # contacts
  resources :contacts, only: [:index, :create, :show]

  # # invitation
  # post 'resend_invitation', to: 'invitations#resend'

  # # company
  # get 'company', to: 'companies#show'

  # # searchable event endpoints
  # get 'events/:event_id/search_other_contacts', to: 'contacts#search_contacts_not_in_event'
  # get 'events/:event_id/search_other_vendors', to: 'vendors#search_vendors_not_in_event'
  # get 'events/:event_id/search_event_contacts', to: 'event_contacts#search'
  # get 'events/:event_id/search_event_vendors', to: 'event_vendors#search'
  # get 'events/:event_id/search_event_tasks', to: 'tasks#search_in_events'
  # get 'events/:event_id/search_event_attachments', to: 'attachments#search_in_events'
  # get 'search_tasks', to: 'tasks#search'
  # get 'search_users', to: 'users#search'
  # get 'search_clients', to: 'contacts#search_clients'
  # get 'search_contacts', to: 'contacts#search'
  # get 'search_events', to: 'events#search'
  # get 'search_vendors', to: 'vendors#search'

  # # event_contacts
  # post 'events/:event_id/contacts', to:'event_contacts#create'
  # post 'events/:event_id/contacts/mass_delete', to:'event_contacts#mass_delete'
  # get '/event_contacts', to:'event_contacts#index'
  # get '/contact_events', to:'event_contacts#index'

  # # event tasks
  # get 'events/:event_id/tasks', to:'tasks#event_tasks'
  # post '/tasks/mass_delete', to:'tasks#mass_destroy'

  # # event_vendors
  # post 'events/:event_id/vendors', to:'event_vendors#create'
  # post 'events/:event_id/vendors/mass_delete', to:'event_vendors#mass_delete'
  # get '/event_vendors', to:'event_vendors#index'
  # get '/vendor_events', to:'event_vendors#index'

  # # event attachments
  # get 'events/:event_id/attachments/new', to:'attachments#quick_create'
  # get 'events/:event_id/attachments', to: 'attachments#event_attachments'
  # post 'events/:event_id/attachments/mass_delete', to:'attachments#mass_destroy'
  # post 'events/:event_id/attachments/', to: 'attachments#create'


  # # contacts
  # post '/contacts/quick_create', to: 'contacts#quick_create'
  # post '/contacts/mass_delete', to:'contacts#mass_destroy'

  # # TODO: specify Event routes
  # post 'destroy_events', to: 'events#mass_delete'

  # # tasks
  # get 'user_tasks', to: 'tasks#for_user'
  # get 'events/:event_id/user_tasks', to: 'tasks#for_user'

  # resources :tasks, :events, :invitations, :users, :profiles, :vendors, :contacts

  #  # vendors
  # post '/vendors/search', to: 'vendors#search'
  # post '/vendors/mass_delete', to:'vendors#mass_destroy'
  # get '/vendors/:id/contacts', to: 'vendors#contacts'

  # # attachments
  # resources :attachments, only: [:index, :new, :create, :destroy]

  # # comments
  # get '/comments', to: 'comments#index'
  # post '/comments', to: 'comments#create'
  # put '/comments', to: 'comments#edit'
  # delete '/comments/:id', to: 'comments#destroy'

  # post '/feedback', to: 'feedback#create'

end
