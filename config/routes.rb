Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :projects, except: [:new, :show, :edit] do
      resources :source_files, except: [:index, :new, :edit] do
      end
      get 'text_changes', to: 'text_changes#index_project'
			resources :replies, only: [:index, :create]
    end

		resources :source_files, only: [] do
			get 'text_changes', to: 'text_changes#index_source_file'
			resources :explanations, only: [:index, :create]
			resources :replies, only: [:index, :create]
		end

    resources :projects, only: [:show], param: :slug

		resources :explanations, except: [:index, :create, :new, :edit] do
			get 'text_changes', to: 'text_changes#index_explanation'
			resources :replies, only: [:index, :create]
		end

    resources :text_changes, only: [:show]

		resources :replies, except: [:index, :show, :new, :edit]

		resources :front_page_items, only: [:index]

		resources :searches, only: [:index]
  end

  root to: 'static_pages#root'

	get "auth/facebook/callback", to: "session_providers#provider"
	get "auth/google_oauth2/callback", to: "session_providers#provider"
	get "auth/github/callback", to: "session_providers#provider"

  get '*unmatched_route', to: 'static_pages#root'
end
