Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :projects, except: [:new, :show, :edit] do
      resources :source_files, except: [:index, :new, :edit] do
        get 'text_changes', to: 'text_changes#index_source_file'
      end
      get 'text_changes', to: 'text_changes#index_project'
			resources :replies, only: [:index, :create]
    end

		resources :source_files, only: [] do
			resources :explanations, only: [:index, :create]
			resources :replies, only: [:index, :create]
		end
    resources :projects, only: [:show], param: :slug
		resources :explanations, except: [:index, :create, :new, :edit] do
			resources :replies, only: [:index, :create]
		end
    resources :text_changes, only: [:show]
		resources :replies, except: [:index, :show, :new, :edit]

		resources :front_page_items, only: [:index]
  end

  root to: 'static_pages#root'
  get '*unmatched_route', to: 'static_pages#root'
end
