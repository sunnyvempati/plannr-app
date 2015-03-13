Rails.application.routes.draw do
  root "events#index"
  resource :user_session, only: [:create, :new, :destroy]
  resources :events, only: [:index]
  resources :profiles, :tasks
end
