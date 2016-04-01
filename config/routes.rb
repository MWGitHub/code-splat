Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :projects, except: [:show] do
      resources :source_files, except: [:index] do
        get 'text_changes', to: 'text_changes#index_source_file'
      end
      get 'text_changes', to: 'text_changes#index_project'
    end
    resources :projects, only: [:show], param: :slug
    resources :text_changes, only: [:show]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
