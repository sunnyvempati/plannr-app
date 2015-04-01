Rails.application.routes.draw do
  root "events#index"
  resources :events, :profiles, :tasks, :contacts
  resource :user_session, only: [:create, :new, :destroy]
end
