Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :projects, only: [:index, :show, :create, :update, :destroy] do
      resources :source_files, only: [:create]
    end
    resources :source_files, only: [:show, :update, :destroy]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
