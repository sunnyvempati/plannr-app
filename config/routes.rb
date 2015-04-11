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

  # event_contacts
  post 'event_contacts', to:'event_contacts#create'
  delete 'event_contacts', to:'event_contacts#destroy'

  # event_vendors
  post 'event_vendors', to:'event_vendors#create'
  delete 'event_vendors', to:'event_vendors#destroy'


  # contacts
  get 'contacts/search', to:'contacts#search'
  get 'events/:id/associated_contacts', to: 'events#retrieve_contacts_associated_to_this_event'
  get 'events/:id/unassociated_contacts', to: 'events#retrieve_contacts_not_associated_to_this_event'

  # vendors
  get 'vendors/search', to:'vendors#search'
  get 'events/:id/associated_vendors', to: 'events#retrieve_vendors_associated_to_this_event'
  get 'events/:id/unassociated_vendors', to: 'events#retrieve_vendors_not_associated_to_this_event'

  resources :tasks, :events, :invitations, :users, :profiles, :vendors, :contacts
end
