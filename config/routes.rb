Rails.application.routes.draw do
  root "events#index"
  resources :events, only: [:index, :new, :create]
  resource :user_session, only: [:create, :new, :destroy]
  resources :profiles, :tasks
end
