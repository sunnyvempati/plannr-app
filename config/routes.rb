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
  get 'events/:id/event_contacts', to: 'contacts#get_contacts_in_event'
  get 'events/:id/other_contacts', to: 'contacts#get_contacts_not_in_event'
  get 'events/:id/search_other_contacts', to: 'contacts#search_contacts_not_in_event'

  # event_contacts
  post 'event_contacts', to:'event_contacts#create'
  delete 'event_contacts', to:'event_contacts#destroy'
  post 'event_contacts/mass_destroy', to:'event_contacts#mass_destroy'

  # # event_vendors
  # post 'event_vendors', to:'event_vendors#create'
  # delete 'event_vendors', to:'event_vendors#destroy'

  # contacts
  post '/contacts/quick_create', to: 'contacts#quick_create'

  resources :tasks, :events, :invitations, :users, :profiles, :vendors, :contacts
end
