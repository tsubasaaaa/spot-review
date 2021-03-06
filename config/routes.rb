Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 
  devise_scope :user do
    get "sign_in", :to => "users/sessions#new"
    get "sign_out", :to => "users/sessions#destroy" 
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'reviews#index'
  # root 'users#index'
  resources :reviews do

    member do
      get 'list'
    end

    collection do
      get 'search'
      get 'search-result'
    end
    
  end

  resources :users, only:[:index, :show]

  resources :relationships, only:[:create, :destroy]

  resources :likes, only:[:create,:destroy]

end
