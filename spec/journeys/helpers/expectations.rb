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

  def to_see_the_income_and_cost_projections
    projections = page.find('#income-and-cost-projections')
    expect(projections).to have_content 'Income and Cost Projections'

    rent_increases = projections.find('#rent-increases')
    expect(rent_increases).to have_content 'Rent Increases'
    expect(rent_increases.all('li', count: 5)[0]).to have_content '0.0%'
    expect(rent_increases.all('li', count: 5)[1]).to have_content '3.0%'
    expect(rent_increases.all('li', count: 5)[2]).to have_content '3.5%'
    expect(rent_increases.all('li', count: 5)[3]).to have_content '3.0%'
    expect(rent_increases.all('li', count: 5)[4]).to have_content '3.0%'

    operating_expense_increases = projections.find('#operating-expense-increases')
    expect(operating_expense_increases).to have_content 'Op Exp Increases'
    expect(operating_expense_increases.all('li', count: 5)[0]).to have_content '0.0%'
    expect(operating_expense_increases.all('li', count: 5)[1]).to have_content '-2.0%'
    expect(operating_expense_increases.all('li', count: 5)[2]).to have_content '-1.0%'
    expect(operating_expense_increases.all('li', count: 5)[3]).to have_content '1.5%'
    expect(operating_expense_increases.all('li', count: 5)[4]).to have_content '2.0%'
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
        water_and_sewer: '$5',
        utilities: '$2,119.97',
        trash_removal: '$125.02',
        professional_fees: '$299.98',
        advertising: '$500.01',
        landscaping: '$0',
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
        taxes: '$121',
        insurance: '$150',
        salaries_and_wages: '$0',
        water_and_sewer: '$0',
        utilities: '$0',
        trash_removal: '$125',
        professional_fees: '$0',
        advertising: '$0',
        landscaping: '$0',
        capital_expenditures: '7.0%',
        other_expenses: '$0',
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
        debt_service: %w($15,839.25 $190,071.06 $190,071.06 $190,071.06 $190,071.06 $190,071.06),
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
        debt_service: %w($1,166.46 $13,997.51 $13,997.51 $13,997.51 $13,997.51 $13,997.51),
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
    assert_net_operating_income({
      interest_on_loan: %w(31.1% $14,559 $173,870 $171,950 $169,895 $167,698 $165,347),
      net_operating_income: %w(56.80% $26,623 $319,481 $341,214 $363,872 $378,325 $392,067),
      building_depreciation_expenses: %w($7,879 $94,545 $94,545 $94,545 $94,545 $94,545),
      net_income_before_taxes: %w($4,185 $51,065 $74,719 $99,432 $116,081 $132,174),
      income_tax_rate: %w(1% $42 $511 $747 $994 $1,161 $1,322),
      net_income_after_taxes: %w($4,143 $50,554 $73,972 $98,437 $114,921 $130,853)
    })

    assert_roi({
      noi_roi: %w(7.89% 11.55% 15.37% 17.94% 20.43%),
      cash_roi: %w(18.24% 21.60% 25.10% 27.33% 29.46%),
      total_roi: %w(22.50% 26.16% 29.98% 32.55% 35.04%),
      one_year_exit_net_cfs: %w(-$647,087 $792,697),
      three_year_exit_net_cfs: %w(-$647,087 $118,025 $139,759 $1,347,717),
      five_year_exit_net_cfs: %w(-$647,087 $118,025 $139,759 $162,417 $176,869 $1,731,312),
      one_year_exit_price_gain: %w($3,235,435 $0 9.87%),
      three_year_exit_price_gain: %w($3,684,997 $449,562 9.87%),
      five_year_exit_price_gain: %w($3,970,531 $735,096 9.87%),
      one_year_annualized_irr: '22.50%',
      three_year_annualized_irr: '39.97%',
      five_year_annualized_irr: '36.20%'
    })

    assert_cash_flow_from_operations({
      net_income_after_taxes: %w($4,143 $50,554 $73,972 $98,437 $114,921 $130,853),
      depreciation_expenses: %w($7,879 $94,545 $94,545 $94,545 $94,545 $94,545),
      total_cf_from_operations: %w($12,022 $145,100 $168,517 $192,983 $209,466 $225,398),
      interest_on_loan: %w($14,559 $173,870 $171,950 $169,895 $167,698 $165,347),
      debt_service: %w($16,787.98 $201,455.71 $201,455.71 $201,455.71 $201,455.71 $201,455.71),
      cash_available_for_loan_servicing: %w($26,623 $319,481 $341,214 $363,872 $378,325 $392,067),
      remaining_cash_flow_from_operations: %w($9,835 $118,025 $139,759 $162,417 $176,869 $190,611),
      principal_reduction: %w($2,229 $27,585 $29,506 $31,560 $33,758 $36,108),
      total_return: %w($12,064 $145,610 $169,265 $193,977 $210,627 $226,720),
      cf_to_debt_servicing_ratio: %w(158.59% 158.59% 169.37% 180.62% 187.80% 194.62%)
    })

    assert_operating_expenses({
      repairs_and_maintenance: %w(11.6594% $5,465.00 $65,580 $64,268 $63,626 $64,580 $65,872),
      property_management_fees: %w(3.5000% $1,640.52 $19,686 $19,293 $19,100 $19,386 $19,774),
      taxes: %w(6.8272% $3,200.03 $38,400 $37,632 $37,256 $37,815 $38,571),
      insurance: %w(1.7324% $812.03 $9,744 $9,549 $9,454 $9,596 $9,788),
      salaries_and_wages: %w(3.8403% $1,800.02 $21,600 $21,168 $20,957 $21,271 $21,696),
      utilities: %w(4.5229% $2,119.97 $25,440 $24,931 $24,682 $25,052 $25,553),
      water_and_sewer: %w(0.0107% $5.00 $60 $59 $58 $59 $60),
      trash_removal: %w(0.2667% $125.02 $1,500 $1,470 $1,456 $1,477 $1,507),
      professional_fees: %w(0.6400% $299.98 $3,600 $3,528 $3,492 $3,545 $3,616),
      advertising: %w(1.0668% $500.01 $6,000 $5,880 $5,821 $5,909 $6,027),
      landscaping: %w(0.0000% $0.00 $0 $0 $0 $0 $0),
      capex: %w(7.0000% $3,281.04 $39,372 $38,585 $38,199 $38,772 $39,548),
      other_expenses: %w(2.1334% $999.99 $12,000 $11,760 $11,642 $11,817 $12,053),
      total: %w(43.1998% $20,248.61 $242,983 $238,124 $235,742 $239,279 $244,064)
    })

    assert_operating_revenues({
      gross_scheduled_rental_income: %w($48,800 $585,600 $603,168 $624,279 $643,007 $662,297),
      vacancy: %w(6.0% $2,928 $35,136 $36,190 $37,457 $38,580 $39,738),
      net_rental_income: %w($45,872 $550,464 $566,978 $586,822 $604,427 $622,560),
      other_income: %w($1,000 $12,000 $12,360 $12,793 $13,176 $13,572),
      gross_income: %w(100% $46,872 $562,464 $579,338 $599,615 $617,603 $636,131)
    })

    assert_rental_increase_projections %w(0.00% 3.00% 3.50% 3.00% 3.00%)
    assert_average_monthly_rents_each_year %w($800 $824 $853 $878 $905)
    assert_operating_expense_projections %w(0.00% -2.00% -1.00% 1.50% 2.00%)

    assert_key_rent_ratios({
      total_area_in_sq_ft: '53,500',
      avg_sq_ft_per_unit: '877',
      avg_rent_per_sq_ft: '$0.91',
      total_cost_per_sq_ft: '$60',
      cost_per_unit: '$53,040',
      cap_rate: '9.87%',
      gross_rent_multiplier: '5.52',
      operational_efficiency: '4.54',
      expenses_per_unit: '$3,983'
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
      property_management_fees: '3.5%',
      taxes: '$3,200.03',
      insurance: '$812.03',
      salaries_and_wages: '$1,800.02',
      water_and_sewer: '$5',
      utilities: '$2,119.97',
      trash_removal: '$125.02',
      professional_fees: '$299.98',
      advertising: '$500.01',
      landscaping: '$0',
      capital_expenditures: '7.0%',
      other_expenses: '$999.99',
      equipment_depreciation: '$0',
      income_tax_rate: '1%'
    })
  end

  private

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
    expect(section).to have_content 'Actual Monthly'
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
    assumptions = page.find('#financing-and-income-assumptions')
    inputs = page.find('#property-and-loan-information')

    expect(assumptions).to have_content 'Financing and Income Assumptions'
    expect(inputs).to have_content 'Inputs'

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
    expect(inputs.find('#property-management-fees', text: 'Property Management Fees')).to have_content details[:property_management_fees]
    expect(inputs.find('#taxes', text: 'Taxes')).to have_content details[:taxes]
    expect(inputs.find('#insurance', text: 'Insurance')).to have_content details[:insurance]
    expect(inputs.find('#salaries-and-wages', text: 'Salaries and Wages')).to have_content details[:salaries_and_wages]
    expect(inputs.find('#water-and-sewer', text: 'Water and Sewer')).to have_content details[:water_and_sewer]
    expect(inputs.find('#utilities', text: 'Utilities')).to have_content details[:utilities]
    expect(inputs.find('#trash-removal', text: 'Trash Removal')).to have_content details[:trash_removal]
    expect(inputs.find('#professional-fees', text: 'Professional Fees')).to have_content details[:professional_fees]
    expect(inputs.find('#advertising', text: 'Advertising')).to have_content details[:advertising]
    expect(inputs.find('#landscaping', text: 'Landscaping')).to have_content details[:landscaping]
    expect(inputs.find('#capital-expenditures', text: 'CapEx')).to have_content details[:capital_expenditures]
    expect(inputs.find('#other-expenses', text: 'Other Expenses')).to have_content details[:other_expenses]
    expect(inputs.find('#equipment-depreciation', text: 'Equipment Depreciation')).to have_content details[:equipment_depreciation]
    expect(inputs.find('#income-tax-rate', text: 'Income Tax Rate')).to have_content details[:income_tax_rate]
  end
end
