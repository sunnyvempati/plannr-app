Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: 'registrations', sessions: 'sessions'}
  root "events#index"

  resources :events, only: [:index]

  resources :profiles, :tasks
end
