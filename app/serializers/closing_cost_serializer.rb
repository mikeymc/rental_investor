class ClosingCostSerializer < ActiveModel::Serializer
  attributes :origination_fee,
             :processing_fee,
             :discount_points,
             :underwriting_fee,
             :appraisal,
             :credit_report,
             :flood_certificate,
             :tax_services,
             :title_insurance,
             :title_fees,
             :survey,
             :government_recording_charges,
             :transfer_taxes,
             :homeowners_insurance,
             :settlement_company_charges,
             :wire_charges
end