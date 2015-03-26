Rails.application.routes.draw do
  root "events#index"

  # login
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'

  # sign up
  get 'new_user', to: 'users#new'
  post 'new_user', to: 'users#create'

  # profile
  get 'users/:id/profile', to: 'profiles#new'
  post 'users/:id/profile', to: 'profiles#create'

  # company


  resources :tasks, :events, :companies, :invitations, :users, :profiles, :user_sessions
end
