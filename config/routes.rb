Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  # Routes for Google authentication
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  scope '/api' do
    get 'groups/new', to: 'groups#new'
    resources :groups
    resource :user, only: [:show, :update]
    resources :messages

    resources :profiles, param: :user_id, only: [:show] do
      resource :follow, only: [:create, :destroy]
    end

    resources :articles, param: :slug, except: [:edit, :new] do
      resource :favorite, only: [:create, :destroy]
      resources :comments, only: [:create, :index, :destroy]
      get :feed, on: :collection
    end

    resources :tags, only: [:index]
  end
end
