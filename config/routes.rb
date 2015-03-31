Rails.application.routes.draw do
  root "events#index"

  # login/logout
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # sign up
  get 'sign_up', to: 'users#new'
  post 'sign_up', to: 'users#create'

  resources :tasks, :events, :companies, :invitations, :users, :profiles

  # errors
  match '/412', to: 'errors#sign_up_precondition_failed', via: :all
end
