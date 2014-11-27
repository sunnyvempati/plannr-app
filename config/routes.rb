Rails.application.routes.draw do
  devise_for :users
  # root 'public#index'

  devise_scope :user do
    root to: "dashboard#index"
  end
end
