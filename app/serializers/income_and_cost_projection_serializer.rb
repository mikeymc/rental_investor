class IncomeAndCostProjectionSerializer < ActiveModel::Serializer
  attributes :rent_increases,
             :operating_expense_increases
end