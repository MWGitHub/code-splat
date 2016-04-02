Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :projects, except: [:show] do
      resources :source_files, except: [:index] do
        get 'text_changes', to: 'text_changes#index_source_file'
      end
      get 'text_changes', to: 'text_changes#index_project'
			resources :replies, only: [:index, :create]
    end

		resources :source_files, only: [] do
			resources :explanations, only: [:index, :create]
			resource :replies, only: [:index, :create]
		end
    resources :projects, only: [:show], param: :slug
		resources :explanations, except: [:index, :create] do
			resources :replies, only: [:index, :create]
		end
    resources :text_changes, only: [:show]
		resources :replies, except: [:index, :show]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
