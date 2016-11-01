class RentalPropertySerializer < ActiveModel::Serializer
  attributes :id,
             :street,
             :city,
             :state,
             :zip_code,
             :user_id

  has_one :financing_and_income_assumption, dependent: :destroy
  has_one :operating_expenses_assumption, dependent: :destroy
  has_one :closing_cost, dependent: :destroy
  has_one :income_and_cost_projection, dependent: :destroy
  has_one :questionnaire, dependent: :destroy
  # belongs_to :user
end
