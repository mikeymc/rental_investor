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
    operating_expenses_assumption = params[:rental_property][:operating_expenses_assumption]
    income_and_cost_projection = params[:rental_property][:income_and_cost_projection]
    @rental_property.financing_and_income_assumption.update({
      land_cost: finance_and_income_assumptions[:land_cost],
      building_cost: finance_and_income_assumptions[:building_cost],
      improvements: finance_and_income_assumptions[:improvements],
      number_of_units: finance_and_income_assumptions[:number_of_units],
      average_monthly_rent_per_unit: finance_and_income_assumptions[:average_monthly_rent_per_unit],
      other_monthly_income: finance_and_income_assumptions[:other_monthly_income],
      equity_percentage: finance_and_income_assumptions[:equity_percentage],
      loan_interest_rate: finance_and_income_assumptions[:loan_interest_rate],
      amortization_period_in_years: finance_and_income_assumptions[:amortization_period_in_years],
      total_square_feet: finance_and_income_assumptions[:total_square_feet]
    })
    @rental_property.operating_expenses_assumption.update({
      vacancy_rate: operating_expenses_assumption[:vacancy_rate],
      repairs_and_maintenance: operating_expenses_assumption[:repairs_and_maintenance],
      property_management_fees: operating_expenses_assumption[:property_management_fees],
      taxes: operating_expenses_assumption[:taxes],
      insurance: operating_expenses_assumption[:insurance],
      salaries_and_wages: operating_expenses_assumption[:salaries_and_wages],
      utilities: operating_expenses_assumption[:utilities],
      water_and_sewer: operating_expenses_assumption[:water_and_sewer],
      trash_removal: operating_expenses_assumption[:trash_removal],
      professional_fees: operating_expenses_assumption[:professional_fees],
      advertising: operating_expenses_assumption[:advertising],
      landscaping: operating_expenses_assumption[:landscaping],
      capex: operating_expenses_assumption[:capex],
      other_expenses: operating_expenses_assumption[:other_expenses],
      income_tax_rate: operating_expenses_assumption[:income_tax_rate]
    })
    @rental_property.income_and_cost_projection.update({
      rent_increases: income_and_cost_projection[:rent_increases],
      operating_expense_increases: income_and_cost_projection[:operating_expense_increases],
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
