class RentalPropertiesController < ApplicationController
  def index
    @rental_properties = RentalProperty.all
  end
end
