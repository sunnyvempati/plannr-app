Rails.application.routes.draw do
  get 'vendor/index'

  root "events#index"
  resources :events
  resource :user_session, only: [:create, :new, :destroy]
  resources :profiles, :tasks, :vendors
end
