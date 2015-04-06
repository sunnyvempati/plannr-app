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

  # password reset
  get 'reset_password_request', to: 'password_resets#new'
  post 'reset_password_request', to: 'password_resets#create'
  get 'reset_password', to: 'password_resets#edit'
  post 'reset_password', to: 'password_resets#update'

  # invitation
  post 'resend_invitation', to: 'invitations#resend'

  # company
  get 'company', to: 'companies#show'

  resources :tasks, :events, :invitations, :users, :profiles, :contacts
end
