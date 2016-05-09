Rentals::Application.routes.draw do
  root 'rental_properties#index'
  resources :rental_properties

  namespace :api, :defaults => {:format => :json} do
    resources :rental_properties
  end

  scope '/api' do
    mount_devise_token_auth_for 'User', at: '/auth'
  end
end
