Rails.application.routes.draw do
  resources :vendors

  root "events#index"
  resources :events
  resource :user_session, only: [:create, :new, :destroy]
  resources :profiles, :tasks
end
