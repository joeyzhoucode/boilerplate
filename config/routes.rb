Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  # Routes for Google authentication
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  get '*path', to: redirect('/login'), constraints: ->(request) do
    request.session[:user_id].nil? && !request.xhr? && request.format.html?
  end

  scope '/api' do
    get 'user', to: 'users#show'
    get 'groups/new', to: 'groups#new'
    resources :groups
    resources :users
    resources :messages
    resources :commands
  end

  get '*path', to: "application#index", constraints: ->(request) do
    request.session[:user_id] && !request.xhr? && request.format.html?
  end
end
