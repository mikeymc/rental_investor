Valuenvestor::Application.routes.draw do
  root 'rental_properties#index'
  resources :rental_properties

  namespace :api, :defaults => {:format => :json} do
    resources :rental_properties
  end
end
