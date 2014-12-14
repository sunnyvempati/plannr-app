Rails.application.routes.draw do
  get 'tasks/index'

  devise_for :users, :controllers => {registrations: 'registrations', sessions: 'sessions'}
  root "dashboards#index"

  resources :profiles, :tasks
end
