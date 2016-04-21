class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rental_properties = RentalProperty.all
    render json: @rental_properties
  end

  def show
    @rental_property = RentalProperty.find(params[:id])
    render json: serialize(@rental_property)
  end

  def update
    @rental_property = RentalProperty.find(params[:rental_property][:id])

    finance_and_income_assumptions = params[:rental_property][:financing_and_income_assumption]
    @rental_property.financing_and_income_assumption.update({
      land_cost: finance_and_income_assumptions[:land_cost],
      building_cost: finance_and_income_assumptions[:building_cost],
      improvements: finance_and_income_assumptions[:improvements],
      number_of_units: finance_and_income_assumptions[:number_of_units],
      average_monthly_rent_per_unit: finance_and_income_assumptions[:average_monthly_rent_per_unit],
      other_monthly_income: finance_and_income_assumptions[:other_monthly_income]
    })
    render json: serialize(@rental_property)
  end

  private

  def serialize(object)
    object.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
    ])
  end
end
