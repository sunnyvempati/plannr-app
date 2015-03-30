Rails.application.routes.draw do
  resources :contacts

  root "events#index"
  resources :events
  resource :user_session, only: [:create, :new, :destroy]
  resources :profiles, :tasks
  resources :contacts
end
