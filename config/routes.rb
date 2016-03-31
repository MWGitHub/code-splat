Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :projects, 
      only: [:index, :show, :create, :update, :destroy], param: :slug do
      resources :source_files, only: [:create]
      get 'text_changes', to: 'text_changes#index_project'
    end
    resources :source_files, only: [:show, :update, :destroy] do
      get 'text_changes', to: 'text_changes#index_source_file'
    end
    resources :text_changes, only: [:show]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
