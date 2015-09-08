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

  post 'toggle_admin', to: 'users#toggle_admin'
  post '/destroy_users', to: 'users#mass_delete'

  # # password reset
  post 'reset_password_request', to: 'password_resets#create'
  post 'reset_password', to: 'password_resets#update'

  # # email verification
  post 'verify', to: 'user_verifications#verify'
  post '/resend_verify', to: 'user_verifications#create'

  # users
  resources :users, only: [:index, :create, :update]
  get 'users/:id', to: 'users#show'

  # events
  resources :events, only: [:index, :create, :update, :show]
  post 'destroy_events', to: 'events#mass_delete'

  # contacts
  resources :contacts, only: [:index, :create, :show, :update]
  post 'destroy_contacts', to: 'contacts#mass_delete'

  # vendors
  resources :vendors, only: [:index, :create, :show, :update]
  post 'destroy_vendors', to: 'vendors#mass_delete'

  # tasks
  resources :tasks, only: [:index, :create, :update, :show]
  post 'destroy_tasks', to:'tasks#mass_destroy'

  # event contacts
  resources :event_contacts, only: [:index, :create]
  post 'destroy_event_contacts', to: 'event_contacts#mass_delete'

  # event vendors
  resources :event_vendors, only: [:index, :create, :show]
  post 'destroy_event_vendors', to: 'event_vendors#mass_delete'

  # attachments
  resources :attachments, only: [:index, :create]
  post 'destroy_event_attachments', to: 'attachments#mass_delete'

  # comments
  resources :comments, only: [:index, :create, :update, :destroy]

  # expenses
  resources :expenses, only: [:index, :show, :create, :destroy, :update]
  resources :event_expense_categories, only: [:index, :show, :create, :destroy, :update]
  resources :expense_categories, only: [:index, :show, :create]
  resources :payments, only: [:create, :update, :destroy]

  # user invitations
  resources :invitations, only: [:create]
  get 'invitation_by_token', to: 'invitations#get_by_token'

  post '/feedback', to: 'feedback#create'
end
