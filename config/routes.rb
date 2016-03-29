Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
