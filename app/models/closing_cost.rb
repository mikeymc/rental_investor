class ClosingCost < ActiveRecord::Base
  belongs_to :rental_property

  alias_attribute :originationFee, :origination_fee
  alias_attribute :processingFee, :processing_fee
  alias_attribute :discountPoints, :discount_points
  alias_attribute :underwritingFee, :underwriting_fee
  alias_attribute :creditReport, :credit_report
  alias_attribute :floodCertificate, :flood_certificate
  alias_attribute :taxServices, :tax_services
  alias_attribute :titleInsurance, :title_insurance
  alias_attribute :titleFees, :title_fees
  alias_attribute :governmentRecordingCharges, :government_recording_charges
  alias_attribute :transferTaxes, :transfer_taxes
  alias_attribute :homeownersInsurance, :homeowners_insurance
  alias_attribute :settlementCompanyCharges, :settlement_company_charges
  alias_attribute :wireCharges, :wire_charges
end
