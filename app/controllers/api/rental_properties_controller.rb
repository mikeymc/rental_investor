class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rental_properties = RentalProperty.all
    render json: @rental_properties
  end

  def show
    @rental_property = RentalProperty.find(params[:id])
    render json: @rental_property.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
    ])
  end

  def update
    finance_and_income_assumptions = params[:rental_property][:financing_and_income_assumption]
    new_land_cost = finance_and_income_assumptions[:land_cost]
    new_property_cost = finance_and_income_assumptions[:building_cost]

    @rental_property = RentalProperty.find(params[:rental_property][:id])

    updates = {
      land_cost: new_land_cost,
      building_cost: new_property_cost
    }

    @rental_property.financing_and_income_assumption.update(updates)
    render json: @rental_property.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
    ])
  end

  def create
    # begin
    #   @budget = Budget.create()
    #   @budget.save!
    #   render json: @budget, serializer: BudgetSerializer
    # rescue
    #   render json: {}, status: 404
    # end
  end
end
