require 'rails_helper'

class Expectations
  include ::RSpec::Matchers
  include Capybara::DSL

  def to_see_a_list_of_properties
    expect(page).to have_content 'Street'
    expect(page).to have_content 'City'
    expect(page).to have_content 'State'
    expect(page).to have_content 'Zip Code'

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'
  end

  def to_see_the_property_details(property)
    if property[:name] == 'moroni'
      assert_property_details({
        land_cost: '$500,000',
        building_cost: '$2,500,000',
        improvements: '$0',
        total_square_feet: '52,500',
        number_of_units: '60',
        average_monthly_rent: '$700.00',
        other_income: '$600.00',
        equity_percentage: '17%',
        loan_interest_rate: '5.750%',
        amortization_period_in_years: '25',
        total_square_feet: '52,500'
      })
    elsif property[:name] == 'sesame'
      assert_property_details({
        land_cost: '$0',
        building_cost: '$299,000',
        improvements: '$0',
        total_square_feet: '3,311',
        number_of_units: '6',
        average_monthly_rent: '$482.00',
        other_income: '$0.00',
        equity_percentage: '20%',
        loan_interest_rate: '4.000%',
        amortization_period_in_years: '30',
        total_square_feet: '3,311'
      })
    elsif property[:name] == 'banana'
      assert_property_details({
        land_cost: '$0',
        building_cost: '$0',
        improvements: '$0',
        total_square_feet: '0',
        number_of_units: '0',
        average_monthly_rent: '$0.00',
        other_income: '$0.00',
        equity_percentage: '0%',
        loan_interest_rate: '0.000%',
        amortization_period_in_years: '0',
        total_square_feet: '0'
      })
    end
  end

  def to_see_the_key_rent_ratios(property)
    if property[:name] == 'moroni'
      assert_key_rent_ratios({
        total_area_in_sq_ft: '52,500',
        avg_sq_ft_per_unit: '875',
        avg_rent_per_sq_ft: '$0.80',
        total_cost_per_sq_ft: '$58',
        cost_per_unit: '$50,557',
        cap_rate: '8.36%',
        gross_rent_multiplier: '6.02',
        operational_efficiency: '4.43',
        expenses_per_unit: '$3,876'
      })
    elsif property[:name] == 'sesame'
      assert_key_rent_ratios({
        total_area_in_sq_ft: '3,311',
        avg_sq_ft_per_unit: '552',
        avg_rent_per_sq_ft: '$0.87',
        total_cost_per_sq_ft: '$92',
        cost_per_unit: '$50,902',
        cap_rate: '6.91%',
        gross_rent_multiplier: '8.80',
        operational_efficiency: '3.58',
        expenses_per_unit: '$1,976'
      })
    end
  end

  def to_see_the_cost_and_revenue_assumptions(property)
    if property[:name] == 'moroni'
      assert_cost_and_revenue_assumptions({
        land: '$500,000',
        building: '$2,500,000',
        improvements: '$0',
        closing_costs: '$33,420',
        total_cost: '$3,033,420',
        number_of_units: '60',
        average_monthly_rent: '$700',
        gross_monthly_rent: '$42,000',
        other_income: '$600',
        total_gross_monthly_income: '$42,600'
      })
    elsif property[:name] == 'sesame'
      assert_cost_and_revenue_assumptions({
        land: '$0',
        building: '$299,000',
        improvements: '$0',
        closing_costs: '$6,410',
        total_cost: '$305,410',
        number_of_units: '6',
        average_monthly_rent: '$482',
        gross_monthly_rent: '$2,892',
        other_income: '$0',
        total_gross_monthly_income: '$2,892'
      })
    end
  end

  def to_see_the_income_and_cost_projections(property)
    if property[:name] == 'moroni'
      assert_income_and_cost_projections({
        rent_increases: %w(0.0% 3.0% 3.5% 3.0% 3.0%),
        operating_expenses_increases: %w(0.0% -2.0% -1.0% 1.5% 2.0%)
      })
    elsif property[:name] == 'sesame'
      assert_income_and_cost_projections({
        rent_increases: %w(0.0% 3.0% 3.5% 3.0% 3.0%),
        operating_expenses_increases: %w(0.0% -2.0% -1.0% 1.5% 2.0%)
      })
    end
  end

  def to_see_the_closing_costs(property)
    if property[:name] == 'moroni'
      assert_closing_costs({
        origination_fee: '$30,000',
        processing_fee: '$400',
        discount_points: '0',
        underwriting_fee: '$500',
        appraisal: '$425',
        credit_report: '$35',
        flood_certificate: '$0',
        tax_services: '$75',
        title_insurance: '$175',
        title_fees: '$180',
        survey: '$175',
        government_recording_charges: '$125',
        transfer_taxes: '$0',
        homeowners_insurance: '$1,100',
        settlement_company_charges: '$175',
        wire_charges: '$55',
        total: '$33,420'
      })
    elsif property[:name] == 'sesame'
      assert_closing_costs({
        origination_fee: '$2,990',
        processing_fee: '$400',
        discount_points: '0',
        underwriting_fee: '$500',
        appraisal: '$425',
        credit_report: '$35',
        flood_certificate: '$0',
        tax_services: '$75',
        title_insurance: '$175',
        title_fees: '$180',
        survey: '$175',
        government_recording_charges: '$125',
        transfer_taxes: '$0',
        homeowners_insurance: '$1,100',
        settlement_company_charges: '$175',
        wire_charges: '$55',
        total: '$6,410'
      })
    end
  end

  def to_see_the_operating_expenses_inputs(property)
    if property[:name] == 'moroni'
      assert_operating_expenses_inputs({
        vacancy_rate: '5.0%',
        repairs_and_maintenance: '$5,265',
        property_management_fees: '3.5%',
        taxes: '$3,200.03',
        insurance: '$812.03',
        salaries_and_wages: '$1,800.02',
        water_and_sewer: '$5.00',
        utilities: '$2,119.97',
        trash_removal: '$125.02',
        professional_fees: '$299.98',
        advertising: '$500.01',
        landscaping: '$0.00',
        capital_expenditures: '7.0%',
        other_expenses: '$999.99',
        equipment_depreciation: '$0',
        income_tax_rate: '1%'
      })
    elsif property[:name] == 'sesame'
      assert_operating_expenses_inputs({
        vacancy_rate: '5.0%',
        repairs_and_maintenance: '$125',
        property_management_fees: '10.0%',
        taxes: '$121.00',
        insurance: '$150.00',
        salaries_and_wages: '$0.00',
        water_and_sewer: '$0.00',
        utilities: '$0.00',
        trash_removal: '$125.00',
        professional_fees: '$0.00',
        advertising: '$0.00',
        landscaping: '$0.00',
        capital_expenditures: '7.0%',
        other_expenses: '$0.00',
        equipment_depreciation: '$0',
        income_tax_rate: '0%'
      })
    end
  end

  def to_see_the_financing_assumptions(property)
    if property[:name] == 'moroni'
      assert_financing_assumptions({
        total_purchase: %w(100% $3,033,420),
        down_payment: %w(17% $515,681),
        loan_amount: %w(83% $2,517,738.60),
        interest_rate: %w(5.750% 0.479%),
        amortization_period: %w(25 300),
        loan_payment: %w($15,839 $190,071)
      })
    elsif property[:name] == 'sesame'
      assert_financing_assumptions({
        total_purchase: %w(100% $305,410),
        down_payment: %w(20% $61,082),
        loan_amount: %w(80% $244,328),
        interest_rate: %w(4.000% 0.333%),
        amortization_period: %w(30 360),
        loan_payment: %w($1,166 $13,997)
      })
    end
  end

  def to_see_the_rental_increase_projections(property)
    if property[:name] == 'moroni'
      assert_rental_increase_projections(%w(0.00% 3.00% 3.50% 3.00% 3.00%))
      assert_average_monthly_rents_each_year(%w($700 $721 $746 $769 $792))
      assert_operating_expense_projections(%w(0.00% -2.00% -1.00% 1.50% 2.00%))
    elsif property[:name] == 'sesame'
      assert_rental_increase_projections(%w(0.00% 3.00% 3.50% 3.00% 3.00%))
      assert_average_monthly_rents_each_year(%w($482 $496 $514 $529 $545))
      assert_operating_expense_projections(%w(0.00% -2.00% -1.00% 1.50% 2.00%))
    end
  end

  def to_see_the_operating_revenues(property)
    if property[:name] == 'moroni'
      assert_operating_revenues({
        gross_scheduled_rental_income: %w($42,000 $504,000 $519,120 $537,289 $553,408 $570,010),
        vacancy: %w(5.0% $2,100 $25,200 $25,956 $26,864 $27,670 $28,501),
        net_rental_income: %w($39,900 $478,800 $493,164 $510,425 $525,737 $541,510),
        other_income: %w($600 $7,200 $7,416 $7,676 $7,906 $8,143),
        gross_income: %w(100% $40,500 $486,000 $500,580 $518,100 $533,643 $549,653)
      })
    elsif property[:name] == 'sesame'
      assert_operating_revenues({
        gross_scheduled_rental_income: %w($2,892 $34,704 $35,745 $36,996 $38,106 $39,249),
        vacancy: %w(5.0% $145 $1,735 $1,787 $1,850 $1,905 $1,962),
        net_rental_income: %W($2,747 $32,969 $33,958 $35,146 $36,201 $37,287),
        other_income: %w($0 $0 $0 $0 $0 $0),
        gross_income: %w(100% $2,747 $32,969 $33,958 $35,146 $36,201 $37,287)
      })
    end
  end

  def to_see_the_operating_expenses(property)
    if property[:name] == 'moroni'
      assert_operating_expenses({
        repairs_and_maintenance: %w(13.0000% $5,265 $63,180 $61,916 $61,297 $62,217 $63,461),
        property_management_fees: %w(3.5000% $1,417.50 $17,010 $16,670 $16,503 $16,751 $17,086),
        taxes: %w(7.9013% $3,200.03 $38,400 $37,632 $37,256 $37,815 $38,571),
        insurance: %w(2.0050% $812.03 $9,744 $9,549 $9,454 $9,596 $9,788),
        salaries_and_wages: %w(4.4445% $1,800.02 $21,600 $21,168 $20,957 $21,271 $21,696),
        utilities: %w(5.2345% $2,119.97 $25,440 $24,931 $24,682 $25,052 $25,553),
        water_and_sewer: %w(0.0123% $5.00 $60 $59 $58 $59 $60),
        trash_removal: %w(0.3087% $125.02 $1,500 $1,470 $1,456 $1,477 $1,507),
        professional_fees: %w(0.7407% $299.98 $3,600 $3,528 $3,492 $3,545 $3,616),
        advertising: %w(1.2346% $500.01 $6,000 $5,880 $5,821 $5,909 $6,027),
        landscaping: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        capex: %w(7.0000% $2,835.00 $34,020 $33,340 $33,006 $33,501 $34,171),
        other_expenses: %w(2.4691% $999.99 $12,000 $11,760 $11,642 $11,817 $12,053),
        total: %w(47.8507% $19,379.55 $232,555 $227,904 $225,624 $229,009 $233,589)
      })
    elsif property[:name] == 'sesame'
      assert_operating_expenses({
        repairs_and_maintenance: %w(4.5498% $125.00 $1,500 $1,470 $1,455 $1,477 $1,507),
        property_management_fees: %w(10.0000% $274.74 $3,297 $3,231 $3,199 $3,247 $3,312),
        taxes: %w(4.4042% $121.00 $1,452 $1,423 $1,409 $1,430 $1,458),
        insurance: %w(5.4597% $150.00 $1,800 $1,764 $1,746 $1,773 $1,808),
        salaries_and_wages: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        utilities: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        water_and_sewer: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        trash_removal: %w(4.5498% $125.00 $1,500 $1,470 $1,455 $1,477 $1,507),
        professional_fees: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        advertising: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        landscaping: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        capex: %w(7.0000% $192.32 $2,308 $2,262 $2,239 $2,273 $2,318),
        other_expenses: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
        total: %w(35.9634% $988 $11,857 $11,620 $11,503 $11,676 $11,909)
      })
    end
  end

  def to_see_the_cash_flow_from_operations(property)
    if property[:name] == 'moroni'
      assert_cash_flow_from_operations({
        net_income_after_taxes: %w($1,466 $18,790 $40,547 $63,028 $78,114 $92,658),
        depreciation_expenses: %w($7,576 $90,909 $90,909 $90,909 $90,909 $90,909),
        total_cf_from_operations: %w($9,041 $109,699 $131,456 $153,937 $169,023 $183,567),
        interest_on_loan: %w($12,064 $143,557 $140,811 $137,902 $134,822 $131,560),
        debt_service: %w($15,839 $190,071 $190,071 $190,071 $190,071 $190,071),
        cash_available_for_loan_servicing: %w($21,120 $253,445 $272,676 $292,476 $304,634 $316,064),
        remaining_cash_flow_from_operations: %w($5,281 $63,374 $82,605 $102,405 $114,563 $125,993),
        principal_reduction: %w($3,775 $46,514 $49,260 $52,169 $55,249 $58,511),
        total_return: %w($9,056 $109,889 $131,866 $154,574 $169,812 $184,503),
        cf_to_debt_servicing_ratio: %w(133.34% 133.34% 143.46% 153.88% 160.27% 166.29%)
      })
    elsif property[:name] == 'sesame'
      assert_cash_flow_from_operations({
        net_income_after_taxes: %w($39 $545 $1,946 $3,433 $4,505 $5,555),
        depreciation_expenses: %w($906 $10,873 $10,873 $10,873 $10,873 $10,873),
        total_cf_from_operations: %w($945 $11,417 $12,819 $14,306 $15,378 $16,428),
        interest_on_loan: %w($814 $9,695 $9,520 $9,337 $9,147 $8,950),
        debt_service: %w($1,166 $13,998 $13,998 $13,998 $13,998 $13,998),
        cash_available_for_loan_servicing: %w($1,759 $21,112 $22,338 $23,643 $24,525 $25,377),
        remaining_cash_flow_from_operations: %w($593 $7,115 $8,341 $9,646 $10,527 $11,380),
        principal_reduction: %w($352 $4,303 $4,478 $4,660 $4,850 $5,048),
        total_return: %w($945 $11,417 $12,819 $14,306 $15,378 $16,428),
        cf_to_debt_servicing_ratio: %w(150.83% 150.83% 159.59% 168.91% 175.21% 181.30%)
      })
    end
  end

  def to_see_the_net_operating_income(property)
    if property[:name] == 'moroni'
      assert_net_operating_income({
        interest_on_loan: %w(29.8% $12,064.16 $143,557 $140,811 $137,902 $134,822 $131,560),
        net_operating_income: %w(52.15% $21,120 $253,445 $272,676 $292,476 $304,634 $316,064),
        building_depreciation_expenses: %w($7,576 $90,909 $90,909 $90,909 $90,909 $90,909),
        net_income_before_taxes: %w($1,481 $18,979 $40,957 $63,664 $78,903 $93,594),
        income_tax_rate: %w(1% $15 $190 $410 $637 $789 $936),
        net_income_after_taxes: %w($1,466 $18,790 $40,547 $63,028 $78,114 $92,658)
      })
    elsif property[:name] == 'sesame'
      assert_net_operating_income({
        interest_on_loan: %w(29.6% $814.43 $9,695 $9,520 $9,337 $9,147 $8,950),
        net_operating_income: %w(64.04% $1,759 $21,112 $22,338 $23,643 $24,525 $25,377),
        building_depreciation_expenses: %w($906 $10,873 $10,873 $10,873 $10,873 $10,873),
        net_income_before_taxes: %w($39 $545 $1,946 $3,433 $4,505 $5,555),
        income_tax_rate: %w(0% $0 $0 $0 $0 $0 $0),
        net_income_after_taxes: %w($39 $545 $1,946 $3,433 $4,505 $5,555)
      })
    end
  end

  def to_see_the_roi(property)
    if property[:name] == 'moroni'
      assert_roi({
        noi_roi: %w(3.68% 7.94% 12.35% 15.30% 18.15%),
        cash_roi: %w(12.29% 16.02% 19.86% 22.22% 24.43%),
        total_roi: %w(21.31% 25.57% 29.97% 32.93% 35.78%),
        one_year_exit_net_cfs: %w(-$515,681 $625,570),
        three_year_exit_net_cfs: %w(-$515,681 $63,374 $82,605 $1,233,174),
        five_year_exit_net_cfs: %w(-$515,681 $63,374 $82,605 $102,405 $114,563 $1,652,837),
        one_year_exit_price_gain: %w($3,033,420 $0 8.36%),
        three_year_exit_price_gain: %w($3,500,565 $467,145 8.36%),
        five_year_exit_price_gain: %w($3,782,880 $749,460 8.36%),
        one_year_annualized_irr: '21.31%',
        three_year_annualized_irr: '42.06%',
        five_year_annualized_irr: '36.32%'
      })
    elsif property[:name] == 'sesame'
      assert_roi({
        noi_roi: %w(0.89% 3.19% 5.62% 7.38% 9.09%),
        cash_roi: %w(11.65% 13.66% 15.79% 17.23% 18.63%),
        total_roi: %w(18.69% 20.99% 23.42% 25.18% 26.89%),
        one_year_exit_net_cfs: %w(-$61,082 $72,499),
        three_year_exit_net_cfs: %w(-$61,082 $7,115 $8,341 $120,781),
        five_year_exit_net_cfs: %w(-$61,082 $7,115 $8,341 $9,646 $10,527 $157,503),
        one_year_exit_price_gain: %w($305,410 $0 6.91%),
        three_year_exit_price_gain: %w($342,023 $36,613 6.91%),
        five_year_exit_price_gain: %w($367,112 $61,702 6.91%),
        one_year_annualized_irr: '18.69%',
        three_year_annualized_irr: '33.25%',
        five_year_annualized_irr: '29.91%'
      })
    end
  end

  def to_see_updated_values
    assert_operating_revenues({
      gross_scheduled_rental_income: %w($48,800 $591,456 $603,285 $625,003 $648,129 $668,220),
      vacancy: %w(6.0% $2,928 $35,487 $36,197 $37,500 $38,888 $40,093),
      net_rental_income: %w($45,872 $555,969 $567,088 $587,503 $609,241 $628,127),
      other_income: %w($1,000 $12,120 $12,362 $12,807 $13,281 $13,693),
      gross_income: %w(100% $46,872 $568,089 $579,450 $600,311 $622,522 $641,820)
    })

    assert_operating_expenses({
      repairs_and_maintenance: %w(11.6594% $5,465.00 $66,236 $64,845 $64,132 $65,158 $66,526),
      property_management_fees: %w(4.5000% $2,109.24 $25,564 $25,027 $24,752 $25,148 $25,676),
      taxes: %w(7.0405% $3,300.03 $39,996 $39,156 $38,726 $39,345 $40,172),
      insurance: %w(1.7538% $822.03 $9,963 $9,754 $9,646 $9,801 $10,007),
      salaries_and_wages: %w(4.0536% $1,900.02 $23,028 $22,545 $22,297 $22,653 $23,129),
      utilities: %w(4.7362% $2,219.97 $26,906 $26,341 $26,051 $26,468 $27,024),
      water_and_sewer: %w(0.0128% $6.00 $73 $71 $70 $72 $73),
      trash_removal: %w(0.2881% $135.02 $1,636 $1,602 $1,584 $1,610 $1,644),
      professional_fees: %w(0.6613% $309.98 $3,757 $3,678 $3,638 $3,696 $3,773),
      advertising: %w(1.0881% $510.01 $6,181 $6,052 $5,985 $6,081 $6,208),
      landscaping: %w(0.0224% $10.50 $127 $125 $123 $125 $128),
      capex: %w(8.0000% $3,749.76 $45,447 $44,493 $44,003 $44,707 $45,646),
      other_expenses: %w(2.2407% $1,050.25 $12,729 $12,462 $12,325 $12,522 $12,785),
      total: %w(46.0569% $21,587.81 $261,644 $256,150 $253,332 $257,385 $262,790)
    })

    assert_net_operating_income({
      net_operating_income: %w(53.94% $25,284 $306,444 $323,301 $346,979 $365,137 $379,030),
      interest_on_loan: %w(31.1% $14,559.46 $173,870 $171,950 $169,895 $167,698 $165,347),
      building_depreciation_expenses: %w($7,879 $94,545 $94,545 $94,545 $94,545 $94,545),
      net_income_before_taxes: %w($2,846 $38,028 $56,805 $82,538 $102,893 $119,137),
      income_tax_rate: %w(10% $285 $3,803 $5,681 $8,254 $10,289 $11,914),
      net_income_after_taxes: %w($2,561 $34,226 $51,125 $74,284 $92,604 $107,223)
    })

    assert_cash_flow_from_operations({
      net_income_after_taxes: %w($2,561 $34,226 $51,125 $74,284 $92,604 $107,223),
      depreciation_expenses: %w($7,879 $94,545 $94,545 $94,545 $94,545 $94,545),
      total_cf_from_operations: %w($10,440 $128,771 $145,670 $168,829 $187,150 $201,769),
      interest_on_loan: %w($14,559 $173,870 $171,950 $169,895 $167,698 $165,347),
      cash_available_for_loan_servicing: %w($25,284 $306,444 $323,301 $346,979 $365,137 $379,030),
      debt_service: %w($16,788 $201,456 $201,456 $201,456 $201,456 $201,456),
      remaining_cash_flow_from_operations: %w($8,496 $104,989 $121,845 $145,523 $163,681 $177,574),
      principal_reduction: %w($2,229 $27,585 $29,506 $31,560 $33,758 $36,108),
      total_return: %w($10,725 $132,574 $151,351 $177,083 $197,439 $213,683),
      cf_to_debt_servicing_ratio: %w(150.61% 152.12% 160.48% 172.24% 181.25% 188.15%)
    })

    assert_roi({
      noi_roi: %w(5.88% 8.78% 12.76% 15.90% 18.41%),
      cash_roi: %w(16.22% 18.83% 22.49% 25.30% 27.44%),
      total_roi: %w(20.49% 23.39% 27.37% 30.51% 33.02%),
      one_year_exit_net_cfs: %w(-$647,087 $779,661),
      three_year_exit_net_cfs: %w(-$647,087 $104,989 $121,845 $1,309,221),
      five_year_exit_net_cfs: %w(-$647,087 $104,989 $121,845 $145,523 $163,681 $1,749,535),
      one_year_exit_price_gain: %w($3,235,435 $0 9.47%),
      three_year_exit_price_gain: %w($3,663,394 $427,959 9.47%),
      five_year_exit_price_gain: %w($4,001,791 $766,356 9.47%),
      one_year_annualized_irr: '20.49%',
      three_year_annualized_irr: '37.29%',
      five_year_annualized_irr: '34.80%'
    })

    assert_rental_increase_projections %w(1.00% 2.00% 3.60% 3.70% 3.10%)
    assert_average_monthly_rents_each_year %w($808 $824 $854 $885 $913)
    assert_operating_expense_projections %w(1.00% -2.10% -1.10% 1.60% 2.10%)

    assert_key_rent_ratios({
      total_area_in_sq_ft: '53,500',
      avg_sq_ft_per_unit: '877',
      avg_rent_per_sq_ft: '$0.91',
      total_cost_per_sq_ft: '$60',
      cost_per_unit: '$53,040',
      cap_rate: '9.47%',
      gross_rent_multiplier: '5.47',
      operational_efficiency: '4.89',
      expenses_per_unit: '$4,289'
    })

    assert_financing_assumptions({
      total_purchase: %w(100% $3,235,435),
      down_payment: %w(20% $647,087),
      loan_amount: %w(80% $2,588,348.00),
      interest_rate: %w(6.750% 0.563%),
      amortization_period: %w(30 360),
      loan_payment: %w($16,787.98 $201,455.71)
    })

    assert_closing_costs({
      origination_fee: '$32,000',
      processing_fee: '$400',
      discount_points: '0',
      underwriting_fee: '$500',
      appraisal: '$425',
      credit_report: '$35',
      flood_certificate: '$0',
      tax_services: '$75',
      title_insurance: '$175',
      title_fees: '$180',
      survey: '$175',
      government_recording_charges: '$125',
      transfer_taxes: '$0',
      homeowners_insurance: '$1,100',
      settlement_company_charges: '$175',
      wire_charges: '$55',
      total: '$35,420'
    })

    assert_property_details({
      land_cost: '$600,000',
      building_cost: '$2,600,000',
      improvements: '$15',
      total_square_feet: '53,500',
      number_of_units: '61',
      average_monthly_rent: '$800.00',
      other_income: '$1,000.00',
      equity_percentage: '20%',
      loan_interest_rate: '6.750%',
      amortization_period_in_years: '30'
    })

    assert_cost_and_revenue_assumptions({
      land: '$600,000',
      building: '$2,600,000',
      improvements: '$15',
      closing_costs: '$35,420',
      total_cost: '$3,235,435',
      number_of_units: '61',
      average_monthly_rent: '$800',
      other_income: '$1,000',
      gross_monthly_rent: '$48,800',
      total_gross_monthly_income: '$49,800'
    })

    assert_operating_expenses_inputs({
      vacancy_rate: '6.0%',
      repairs_and_maintenance: '$5,465',
      property_management_fees: '4.5%',
      taxes: '$3,300.03',
      insurance: '$822.03',
      salaries_and_wages: '$1,900.02',
      utilities: '$2,219.97',
      water_and_sewer: '$6.00',
      trash_removal: '$135.02',
      professional_fees: '$309.98',
      advertising: '$510.01',
      landscaping: '$10.50',
      capital_expenditures: '8.0%',
      other_expenses: '$1,050.25',
      equipment_depreciation: '$0',
      income_tax_rate: '10%'
    })
  end

  private

  def assert_income_and_cost_projections(property)
    projections = page.find('#income-and-cost-projections')
    expect(projections).to have_content 'Income and Cost Projections'

    rent_increases = projections.find('#rent-increases')
    expect(rent_increases).to have_content 'Rent Increases'
    expect(rent_increases.find_field('year-one-rent-increases-input').value).to eq property[:rent_increases][0]
    expect(rent_increases.find_field('year-two-rent-increases-input').value).to eq property[:rent_increases][1]
    expect(rent_increases.find_field('year-three-rent-increases-input').value).to eq property[:rent_increases][2]
    expect(rent_increases.find_field('year-four-rent-increases-input').value).to eq property[:rent_increases][3]
    expect(rent_increases.find_field('year-five-rent-increases-input').value).to eq property[:rent_increases][4]

    operating_expense_increases = projections.find('#operating-expense-increases')
    expect(operating_expense_increases).to have_content 'Op Exp Increases'
    expect(operating_expense_increases.find_field('year-one-operating-expenses-increases-input').value).to eq property[:operating_expenses_increases][0]
    expect(operating_expense_increases.find_field('year-two-operating-expenses-increases-input').value).to eq property[:operating_expenses_increases][1]
    expect(operating_expense_increases.find_field('year-three-operating-expenses-increases-input').value).to eq property[:operating_expenses_increases][2]
    expect(operating_expense_increases.find_field('year-four-operating-expenses-increases-input').value).to eq property[:operating_expenses_increases][3]
    expect(operating_expense_increases.find_field('year-five-operating-expenses-increases-input').value).to eq property[:operating_expenses_increases][4]
  end

  def assert_roi(details)
    income = page.find('#return-on-investment')
    expect(income).to have_content 'Net Operating Income ROI'

    details[:noi_roi].each do |item|
      expect(income.find('.row', text: 'Net Operating Income ROI')).to have_content item
    end
    details[:cash_roi].each do |item|
      expect(income.find('.row', text: 'Cash ROI')).to have_content item
    end
    details[:total_roi].each do |item|
      expect(income.find('.row', text: 'Total ROI')).to have_content item
    end

    cfs = page.find('#net-cash-flows')
    details[:one_year_exit_net_cfs].each do |item|
      expect(cfs.find('.row', text: 'Net CFs from Investment - 1 Yr Exit')).to have_content item
    end
    details[:three_year_exit_net_cfs].each do |item|
      expect(cfs.find('.row', text: 'Net CFs from Investment - 3 Yr Exit')).to have_content item
    end
    details[:five_year_exit_net_cfs].each do |item|
      expect(cfs.find('.row', text: 'Net CFs from Investment - 5 Yr Exit')).to have_content item
    end

    exits = page.find('#exit-scenarios')
    expect(exits).to have_content 'Exit Price'
    expect(exits).to have_content 'Gain on Sale'
    expect(exits).to have_content 'Cap Rate'
    details[:one_year_exit_price_gain].each do |item|
      expect(exits.find('.row', text: 'Est Exit Price/Gain on Sale - 1 Yr')).to have_content item
    end
    details[:three_year_exit_price_gain].each do |item|
      expect(exits.find('.row', text: 'Est Exit Price/Gain on Sale - 3 Yr')).to have_content item
    end
    details[:five_year_exit_price_gain].each do |item|
      expect(exits.find('.row', text: 'Est Exit Price/Gain on Sale - 5 Yr')).to have_content item
    end

    irr = page.find('#irr')
    expect(irr.find('.row', text: 'Annualized IRR - 1 Yr')).to have_content details[:one_year_annualized_irr]
    expect(irr.find('.row', text: 'Annualized IRR - 3 Yr')).to have_content details[:three_year_annualized_irr]
    expect(irr.find('.row', text: 'Annualized IRR - 5 Yr')).to have_content details[:five_year_annualized_irr]
  end

  def assert_net_operating_income(details)
    income = page.find('#net-operating-income')
    expect(income).to have_content 'Net Operating Income'

    details[:net_income_before_taxes].each do |item|
      expect(income.find('.row', text: 'Net Income Before Taxes')).to have_content item
    end
    details[:net_income_after_taxes].each do |item|
      expect(income.find('.row', text: 'Net Income After Taxes')).to have_content item
    end
    details[:income_tax_rate].each do |item|
      expect(income.find('.row', text: 'Income Tax Rate')).to have_content item
    end
    details[:interest_on_loan].each do |item|
      expect(income.find('.row', text: 'Interest on Loan')).to have_content item
    end
    details[:net_operating_income].each do |item|
      expect(income.find('.row', text: 'Net Operating Income')).to have_content item
    end
    details[:building_depreciation_expenses].each do |item|
      expect(income.find('.row', text: 'Depreciation Expenses - Building')).to have_content item
    end
  end

  def assert_cash_flow_from_operations(details)
    cash_flow = page.find('#cash-flow-from-operations')
    expect(cash_flow).to have_content 'Cash Flow from Operations'

    details[:net_income_after_taxes].each do |item|
      expect(cash_flow.find('.row', text: 'Net Income After Taxes')).to have_content item
    end
    details[:depreciation_expenses].each do |item|
      expect(cash_flow.find('.row', text: 'Depreciation Expenses')).to have_content item
    end
    details[:total_cf_from_operations].each do |item|
      expect(cash_flow.find('.row', text: 'Total CF from Operations')).to have_content item
    end
    details[:interest_on_loan].each do |item|
      expect(cash_flow.find('.row', text: 'Interest on Loan')).to have_content item
    end
    details[:debt_service].each do |item|
      expect(cash_flow.find('.row', text: 'Debt Service')).to have_content item
    end
    details[:cash_available_for_loan_servicing].each do |item|
      expect(cash_flow.find('.row', text: 'Cash Available for Loan Servicing')).to have_content item
    end
    details[:remaining_cash_flow_from_operations].each do |item|
      expect(cash_flow.find('.row', text: 'Remaining CF from Operations')).to have_content item
    end
    details[:principal_reduction].each do |item|
      expect(cash_flow.find('.row', text: 'Plus Principal Reduction')).to have_content item
    end
    details[:total_return].each do |item|
      expect(cash_flow.find('.row', text: 'Total Return')).to have_content item
    end
    details[:cf_to_debt_servicing_ratio].each do |item|
      expect(cash_flow.find('.row', text: 'CF/Debt Servicing Ratio')).to have_content item
    end
  end

  def assert_operating_expenses(details)
    expenses = page.find('#operating-expenses')
    expect(expenses).to have_content 'Operating Expenses'

    details[:repairs_and_maintenance].each do |expense|
      expect(expenses.find('.row', text: 'Repairs and Maintenance')).to have_content expense
    end
    details[:property_management_fees].each do |fee|
      expect(expenses.find('.row', text: 'Property Management Fees')).to have_content fee
    end
    details[:taxes].each do |tax|
      expect(expenses.find('.row', text: 'Taxes')).to have_content tax
    end
    details[:insurance].each do |cost|
      expect(expenses.find('.row', text: 'Insurance')).to have_content cost
    end
    details[:salaries_and_wages].each do |cost|
      expect(expenses.find('.row', text: 'Salaries and Wages')).to have_content cost
    end
    details[:utilities].each do |cost|
      expect(expenses.find('.row', text: 'Utilities')).to have_content cost
    end
    details[:water_and_sewer].each do |cost|
      expect(expenses.find('.row', text: 'Water and Sewer')).to have_content cost
    end
    details[:trash_removal].each do |cost|
      expect(expenses.find('.row', text: 'Trash Removal')).to have_content cost
    end
    details[:professional_fees].each do |cost|
      expect(expenses.find('.row', text: 'Professional Fees')).to have_content cost
    end
    details[:advertising].each do |cost|
      expect(expenses.find('.row', text: 'Advertising')).to have_content cost
    end
    details[:landscaping].each do |cost|
      expect(expenses.find('.row', text: 'Landscaping')).to have_content cost
    end
    details[:capex].each do |cost|
      expect(expenses.find('.row', text: 'CapEx')).to have_content cost
    end
    details[:other_expenses].each do |cost|
      expect(expenses.find('.row', text: 'Other')).to have_content cost
    end
    details[:total].each do |cost|
      expect(expenses.find('.row', text: 'Total Operating Expenses')).to have_content cost
    end
  end

  def assert_operating_revenues(details)
    section = page.find('#operating-revenues')

    expect(section).to have_content 'Operating Revenues'
    expect(section).to have_content 'Monthly'
    expect(section).to have_content 'Projected'

    (1..5).each { |year| expect(section).to have_content "Year #{year}" }

    details[:gross_scheduled_rental_income].each do |income|
      expect(section.find('.row', text: 'Gross Scheduled Rent Income')).to have_content income
    end
    details[:vacancy].each do |cost|
      expect(section.find('.row', text: 'Vacancy Rate')).to have_content cost
    end
    details[:net_rental_income].each do |income|
      expect(section.find('.row', text: 'Net Rental Income')).to have_content income
    end
    details[:other_income].each do |income|
      expect(section.find('.row', text: 'Other Income')).to have_content income
    end
    details[:gross_income].each do |income|
      expect(section.find('.row', text: 'Gross Income')).to have_content income
    end
  end

  def assert_operating_expense_projections(projections)
    section = page.find('#operating-expense-projections')

    expect(section).to have_content 'Operating Expense Projections'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_average_monthly_rents_each_year(projections)
    section = page.find('#average-monthly-rents-each-year')

    expect(section).to have_content 'Average Monthly Rent'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_rental_increase_projections(projections)
    section = page.find('#rental-increase-projections')

    expect(section).to have_content 'Rental Increase Projections'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_key_rent_ratios(details)
    ratios = page.find('#key-rent-ratios')

    expect(ratios).to have_content 'Key Rent Ratios'
    expect(page.find('#key-rent-ratios .row', text: 'Total Square Feet')).to have_content details[:total_area_in_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Sq Ft/Unit')).to have_content details[:avg_sq_ft_per_unit]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Rent/Sq Ft')).to have_content details[:avg_rent_per_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Total Cost/Sq Ft')).to have_content details[:total_cost_per_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Cost per Unit')).to have_content details[:cost_per_unit]
    expect(page.find('#key-rent-ratios .row', text: 'Capitalization Rate')).to have_content details[:cap_rate]
    expect(page.find('#key-rent-ratios .row', text: 'Gross Rent Multiplier')).to have_content details[:gross_rent_multiplier]
    expect(page.find('#key-rent-ratios .row', text: 'Expenses/Sq Ft (Op Efficiency)')).to have_content details[:operational_efficiency]
    expect(page.find('#key-rent-ratios .row', text: 'Expenses per Unit')).to have_content details[:expenses_per_unit]
  end

  def assert_financing_assumptions(details)
    closing_costs = page.find('#financing-assumptions')
    expect(closing_costs).to have_content 'Financing Assumptions'
    expect(closing_costs).to have_content 'Annual'
    expect(closing_costs).to have_content 'Monthly'

    details[:total_purchase].each do |item|
      expect(closing_costs.find('#total-purchase', text: 'Total Purchase')).to have_content item
    end
    details[:down_payment].each do |item|
      expect(closing_costs.find('#down-payment', text: 'Owner\'s Equity')).to have_content item
    end
    details[:loan_amount].each do |item|
      expect(closing_costs.find('#balance-to-finance', text: 'Balance to Finance')).to have_content item
    end
    details[:interest_rate].each do |item|
      expect(closing_costs.find('#interest-rate', text: 'Interest Rate')).to have_content item
    end
    details[:amortization_period].each do |item|
      expect(closing_costs.find('#amortization-period', text: 'Amortization Period')).to have_content item
    end
    details[:loan_payment].each do |item|
      expect(closing_costs.find('#loan-payment', text: 'Payment')).to have_content item
    end
  end

  def assert_closing_costs(details)
    closing_costs = page.find('#closing-costs')
    expect(closing_costs).to have_content 'Closing Costs'
    expect(closing_costs.find('#origination-fee', text: 'Origination Fee')).to have_content details[:origination_fee]
    expect(closing_costs.find('#processing-fee', text: 'Processing Fee')).to have_content details[:processing_fee]
    expect(closing_costs.find('#discount-points', text: 'Discount Points')).to have_content details[:discount_points]
    expect(closing_costs.find('#underwriting-fee', text: 'Underwriting Fee')).to have_content details[:underwriting_fee]
    expect(closing_costs.find('#appraisal', text: 'Appraisal')).to have_content details[:appraisal]
    expect(closing_costs.find('#credit-report', text: 'Credit Report')).to have_content details[:credit_report]
    expect(closing_costs.find('#flood-certificate', text: 'Flood Certificate')).to have_content details[:flood_certificate]
    expect(closing_costs.find('#tax-services', text: 'Tax Services')).to have_content details[:tax_services]
    expect(closing_costs.find('#title-insurance', text: 'Title Insurance')).to have_content details[:title_insurance]
    expect(closing_costs.find('#title-fees', text: 'Title Fees')).to have_content details[:title_fees]
    expect(closing_costs.find('#survey', text: 'Survey')).to have_content details[:survey]
    expect(closing_costs.find('#government-recording-charges', text: 'Government Recording Charges')).to have_content details[:government_recording_charges]
    expect(closing_costs.find('#transfer-taxes', text: 'Transfer Taxes')).to have_content details[:transfer_taxes]
    expect(closing_costs.find('#homeowners-insurance', text: 'Homeowners Insurance')).to have_content details[:homeowners_insurance]
    expect(closing_costs.find('#settlement-company-charges', text: 'Settlement Company Charges')).to have_content details[:settlement_company_charges]
    expect(closing_costs.find('#wire-charges', text: 'Wire Charges')).to have_content details[:wire_charges]
    expect(closing_costs.find('#total-closing-costs', text: 'Total')).to have_content details[:total]
  end

  def assert_property_details(details)
    inputs = page.find('#property-and-loan-information')

    expect(inputs).to have_content 'Property and Loan Information'

    expect(inputs.find_field('land-cost-input').value).to eq details[:land_cost]
    expect(inputs.find_field('building-cost-input').value).to eq details[:building_cost]
    expect(inputs.find_field('improvements-input').value).to eq details[:improvements]
    expect(inputs.find('#total-square-feet')).to have_content details[:total_sq_ft]
    expect(inputs.find_field('number-of-units-input').value).to eq details[:number_of_units]
    expect(inputs.find_field('average-monthly-rent-input').value).to eq details[:average_monthly_rent]
    expect(inputs.find_field('other-income-input').value).to eq details[:other_income]
    expect(inputs.find_field('equity-percentage-input').value).to eq details[:equity_percentage]
    expect(inputs.find_field('amortization-period-in-years-input').value).to eq details[:amortization_period_in_years]
    expect(inputs.find_field('loan-interest-rate-input').value).to eq details[:loan_interest_rate]
    expect(inputs.find_field('total-square-feet-input').value).to eq details[:total_square_feet]
  end

  def assert_cost_and_revenue_assumptions(details)
    assumptions = page.find('#cost-and-revenue-assumptions')
    expect(assumptions).to have_content 'Cost and Revenue Assumptions'
    expect(assumptions.find('div', text: 'Land')).to have_content details[:land]
    expect(assumptions.find('div', text: 'Building')).to have_content details[:building]
    expect(assumptions.find('div', text: 'Improvements')).to have_content details[:improvements]
    expect(assumptions.find('div', text: 'Closing Costs')).to have_content details[:closing_costs]
    expect(assumptions.find('div', text: 'Total Cost')).to have_content details[:total_cost]
    expect(assumptions.find('div', text: 'Number of Units')).to have_content details[:number_of_units]
    expect(assumptions.find('div', text: 'Average Monthly Rent')).to have_content details[:average_monthly_rent]
    expect(assumptions.find('div', text: 'Gross Monthly Rent')).to have_content details[:gross_monthly_rent]
    expect(assumptions.find('div', text: 'Other Income')).to have_content details[:other_income]
    expect(assumptions.find('div', text: 'Total Gross Monthly Income')).to have_content details[:total_gross_monthly_income]
  end

  def assert_operating_expenses_inputs(details)
    inputs = page.find('#operating-expenses-inputs')

    expect(inputs).to have_content 'Monthly Operating Expenses'
    expect(inputs.find_field('vacancy-rate-input').value).to eq details[:vacancy_rate]
    expect(inputs.find_field('repairs-and-maintenance-input').value).to eq details[:repairs_and_maintenance]
    expect(inputs.find_field('property-management-fees-input').value).to eq details[:property_management_fees]
    expect(inputs.find_field('taxes-input').value).to eq details[:taxes]
    expect(inputs.find_field('insurance-input').value).to eq details[:insurance]
    expect(inputs.find_field('salaries-and-wages-input').value).to eq details[:salaries_and_wages]
    expect(inputs.find_field('water-and-sewer-input').value).to eq details[:water_and_sewer]
    expect(inputs.find_field('utilities-input').value).to eq details[:utilities]
    expect(inputs.find_field('trash-removal-input').value).to eq details[:trash_removal]
    expect(inputs.find_field('professional-fees-input').value).to eq details[:professional_fees]
    expect(inputs.find_field('advertising-input').value).to eq details[:advertising]
    expect(inputs.find_field('landscaping-input').value).to eq details[:landscaping]
    expect(inputs.find_field('capital-expenditures-input').value).to eq details[:capital_expenditures]
    expect(inputs.find_field('other-expenses-input').value).to eq details[:other_expenses]
    expect(inputs.find_field('income-tax-rate-input').value).to eq details[:income_tax_rate]
  end
end
