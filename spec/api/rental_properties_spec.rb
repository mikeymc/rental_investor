require 'rails_helper'

describe 'rental_properties' do
  before(:each) do
    Rails.application.load_seed
  end

  describe 'when a user is not logged in' do
    before :each do
      @user = nil
      allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
    end

    describe('#index') do
      it 'returns a 401' do
        get '/api/rental_properties'
        expect(response.status).to eq(401)
      end
    end

    describe('#show') do
      it 'returns a 401' do
        get '/api/rental_properties/1'
        expect(response.status).to eq(401)
      end
    end

    describe('#create') do
      it 'returns a 401' do
        post '/api/rental_properties', {}
        expect(response.status).to eq(401)
      end
    end

    describe('#edit') do
      it 'returns a 401' do
        put '/api/rental_properties/1', {}
        expect(response.status).to eq(401)
      end
    end

    describe('#destroy') do
      it 'returns a 401' do
        delete '/api/rental_properties/1'
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'when a user is logged in' do
    before(:each) do
      @user = User.new(id: 1)
    end

    describe '#index' do
      it 'fetches properties' do
        allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
        get '/api/rental_properties'

        expect(response.status).to eq(200)
      end

      describe 'when one user is signed in' do
        it 'fetches properties for that user' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

          get '/api/rental_properties'
          response_body = JSON.parse(response.body)
          properties = response_body['rentalProperties']

          expect(properties.size).to eq 2
          properties.each do |property|
            expect(property['userId']).to eq(1)
          end
        end
      end

      describe 'when another user is signed in' do
        it 'fetches properties for that user' do
          @user = User.new(id: 2)
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

          get '/api/rental_properties'
          payload = JSON.parse(response.body)
          properties = payload['rentalProperties']

          expect(properties.size).to eq 1
          properties.each do |property|
            expect(property['userId']).to eq(2)
          end
        end
      end
    end

    describe '#show' do
      describe 'when a user requests info on his own property' do
        it 'returns the property' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

          get '/api/rental_properties/1'

          expect(response.status).to eq(200)
          payload = JSON.parse(response.body)
          property = payload['rentalProperty']
          expect(property['id']).to eq(1)
        end

        describe 'the json payload for a property' do
          it 'has the right structure and fields' do
            allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

            get '/api/rental_properties/1'
            payload = JSON.parse(response.body)
            property = payload['rentalProperty']

            expect(property['id']).to eq(1)
            expect(property['street']).to eq('421 Moroni Blvd')
            expect(property['city']).to eq('Salt Lake City')
            expect(property['state']).to eq('UT')
            expect(property['zipCode']).to eq('12345')

            financing_and_income_assumption = property['financingAndIncomeAssumption']
            expect(financing_and_income_assumption).to be
            expect(financing_and_income_assumption['landCost']).to eq('500000.0')
            expect(financing_and_income_assumption['buildingCost']).to eq('2500000.0')
            expect(financing_and_income_assumption['improvements']).to eq('0.0')
            expect(financing_and_income_assumption['totalSquareFeet']).to eq('52500.0')
            expect(financing_and_income_assumption['numberOfUnits']).to eq('60.0')
            expect(financing_and_income_assumption['averageMonthlyRentPerUnit']).to eq('700.0')
            expect(financing_and_income_assumption['otherMonthlyIncome']).to eq('600.0')
            expect(financing_and_income_assumption['equityPercentage']).to eq('17.0')
            expect(financing_and_income_assumption['loanInterestRate']).to eq('5.75')
            expect(financing_and_income_assumption['amortizationPeriodInYears']).to eq('25.0')

            operating_expenses_assumption = property['operatingExpensesAssumption']
            expect(operating_expenses_assumption).to be
            expect(operating_expenses_assumption['vacancyRate']).to eq('5.0')
            expect(operating_expenses_assumption['repairsAndMaintenance']).to eq('5265.0')
            expect(operating_expenses_assumption['propertyManagementFees']).to eq('3.5')
            expect(operating_expenses_assumption['taxes']).to eq('3200.03')
            expect(operating_expenses_assumption['insurance']).to eq('812.03')
            expect(operating_expenses_assumption['salariesAndWages']).to eq('1800.02')
            expect(operating_expenses_assumption['utilities']).to eq('2119.97')
            expect(operating_expenses_assumption['waterAndSewer']).to eq('5.0')
            expect(operating_expenses_assumption['trashRemoval']).to eq('125.02')
            expect(operating_expenses_assumption['professionalFees']).to eq('299.98')
            expect(operating_expenses_assumption['advertising']).to eq('500.01')
            expect(operating_expenses_assumption['landscaping']).to eq('0.0')
            expect(operating_expenses_assumption['capex']).to eq('7.0')
            expect(operating_expenses_assumption['otherExpenses']).to eq('999.99')
            expect(operating_expenses_assumption['equipmentDepreciation']).to eq('0.0')
            expect(operating_expenses_assumption['incomeTaxRate']).to eq('1.0')

            closing_costs = property['closingCost']
            expect(closing_costs).to be
            expect(closing_costs['originationFee']).to eq('30000.0')
            expect(closing_costs['processingFee']).to eq('400.0')
            expect(closing_costs['discountPoints']).to eq('0.0')
            expect(closing_costs['underwritingFee']).to eq('500.0')
            expect(closing_costs['appraisal']).to eq('425.0')
            expect(closing_costs['creditReport']).to eq('35.0')
            expect(closing_costs['floodCertificate']).to eq('0.0')
            expect(closing_costs['taxServices']).to eq('75.0')
            expect(closing_costs['titleInsurance']).to eq('175.0')
            expect(closing_costs['titleFees']).to eq('180.0')
            expect(closing_costs['survey']).to eq('175.0')
            expect(closing_costs['governmentRecordingCharges']).to eq('125.0')
            expect(closing_costs['transferTaxes']).to eq('0.0')
            expect(closing_costs['homeownersInsurance']).to eq('1100.0')
            expect(closing_costs['settlementCompanyCharges']).to eq('175.0')
            expect(closing_costs['wireCharges']).to eq('55.0')

            income_and_cost_projection = property['incomeAndCostProjection']
            expect(income_and_cost_projection).to be
            expect(income_and_cost_projection['rentIncreases']).to eq(%w(0.0 3.0 3.5 3.0 3.0))
            expect(income_and_cost_projection['operatingExpenseIncreases']).to eq(%w(0.0 -2.0 -1.0 1.5 2.0))
          end
        end
      end

      describe 'when a user requests info on a property owned by someone else' do
        it 'returns the property' do
          @user = User.new(id: 2)
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

          get '/api/rental_properties/1'

          expect(response.status).to eq(404)
        end
      end
    end

    describe '#update' do
      describe 'when the user is updating his own property' do
        it 'returns a 200' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
          put '/api/rental_properties/2', {
              rentalProperty: {
                  id: 1,
                  street: '421 Moroni Blvd',
                  city: 'Salt Lake City',
                  zipCode: '12345',
                  userId: 1,
                  financingAndIncomeAssumption: {
                      landCost: '500000.0',
                      buildingCost: '2500000.0',
                      improvements: '0.0',
                      totalSquareFeet: '52500.0',
                      numberOfUnits: '60.0',
                      averageMonthlyRentPerUnit: '700.0',
                      otherMonthlyIncome: '600.0',
                      equityPercentage: '17.0',
                      loanInterestRate: '5.75',
                      amortizationPeriodInYears: '25.0'
                  },
                  operatingExpensesAssumption: {
                      vacancyRate: '5.0',
                      repairsAndMaintenance: '5265.0',
                      propertyManagementFees: '3.5',
                      taxes: '3200.03',
                      insurance: '812.03',
                      salariesAndWages: '1800.02',
                      utilities: '2119.97',
                      waterAndSewer: '5.0',
                      trashRemoval: '125.02',
                      professionalFees: '299.98',
                      advertising: '500.01',
                      landscaping: '0.0',
                      capex: '7.0',
                      otherExpenses: '999.99',
                      equipmentDepreciation: '0.0',
                      incomeTaxRate: '1.0'
                  },
                  closingCost: {
                      originationFee: '30000.0',
                      processingFee: '400.0',
                      discountPoints: '0.0',
                      underwritingFee: '500.0',
                      appraisal: '425.0',
                      creditReport: '35.0',
                      floodCertificate: '0.0',
                      taxServices: '75.0',
                      titleInsurance: '175.0',
                      titleFees: '180.0',
                      survey: '175.0',
                      governmentRecordingCharges: '125.0',
                      transferTaxes: '0.0',
                      homeownersInsurance: '1100.0',
                      settlementCompanyCharges: '175.0',
                      wireCharges: '55.0'
                  },
                  incomeAndCostProjection: {
                      rentIncreases: %w(0.0 3.0 3.5 3.0 3.0),
                      operatingExpenseIncreases: %w(0.0 -2.0 -1.0 1.5 2.0)
                  }
              }
          }

          expect(response.status).to eq(200)
        end

        describe 'when the property does not yet have a questionnaire but the user adds one' do
          it 'creates a questionnaire and then saves it' do
            allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

            RentalProperty.find(2).questionnaire = nil

            put '/api/rental_properties/2', {
                rentalProperty: {
                    id: 1,
                    street: '421 Moroni Blvd',
                    city: 'Salt Lake City',
                    zipCode: '12345',
                    userId: 1,
                    financingAndIncomeAssumption: {
                        landCost: '500000.0',
                        buildingCost: '2500000.0',
                        improvements: '0.0',
                        totalSquareFeet: '52500.0',
                        numberOfUnits: '60.0',
                        averageMonthlyRentPerUnit: '700.0',
                        otherMonthlyIncome: '600.0',
                        equityPercentage: '17.0',
                        loanInterestRate: '5.75',
                        amortizationPeriodInYears: '25.0'
                    },
                    operatingExpensesAssumption: {
                        vacancyRate: '5.0',
                        repairsAndMaintenance: '5265.0',
                        propertyManagementFees: '3.5',
                        taxes: '3200.03',
                        insurance: '812.03',
                        salariesAndWages: '1800.02',
                        utilities: '2119.97',
                        waterAndSewer: '5.0',
                        trashRemoval: '125.02',
                        professionalFees: '299.98',
                        advertising: '500.01',
                        landscaping: '0.0',
                        capex: '7.0',
                        otherExpenses: '999.99',
                        equipmentDepreciation: '0.0',
                        incomeTaxRate: '1.0'
                    },
                    closingCost: {
                        originationFee: '30000.0',
                        processingFee: '400.0',
                        discountPoints: '0.0',
                        underwritingFee: '500.0',
                        appraisal: '425.0',
                        creditReport: '35.0',
                        floodCertificate: '0.0',
                        taxServices: '75.0',
                        titleInsurance: '175.0',
                        titleFees: '180.0',
                        survey: '175.0',
                        governmentRecordingCharges: '125.0',
                        transferTaxes: '0.0',
                        homeownersInsurance: '1100.0',
                        settlementCompanyCharges: '175.0',
                        wireCharges: '55.0'
                    },
                    incomeAndCostProjection: {
                        rentIncreases: %w(0.0 3.0 3.5 3.0 3.0),
                        operatingExpenseIncreases: %w(0.0 -2.0 -1.0 1.5 2.0)
                    },
                    questionnaire: {
                        reason_owner_is_selling: 'some-reason'
                    }
                }
            }

            expect(response.status).to eq(200)
          end
        end
      end

      describe 'when the user is updating a property owned by someone else' do
        it 'returns a 403' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
          put '/api/rental_properties/3', {
              rentalProperty: {
                  id: 3,
                  street: '421 Moroni Blvd',
                  city: 'Salt Lake City',
                  zipCode: '12345',
                  financingAndIncomeAssumption: {
                      landCost: '500000.0',
                      buildingCost: '2500000.0',
                      improvements: '0.0',
                      totalSquareFeet: '52500.0',
                      numberOfUnits: '60.0',
                      averageMonthlyRentPerUnit: '700.0',
                      otherMonthlyIncome: '600.0',
                      equityPercentage: '17.0',
                      loanInterestRate: '5.75',
                      amortizationPeriodInYears: '25.0'
                  },
                  operatingExpensesAssumption: {
                      vacancyRate: '5.0',
                      repairsAndMaintenance: '5265.0',
                      propertyManagementFees: '3.5',
                      taxes: '3200.03',
                      insurance: '812.03',
                      salariesAndWages: '1800.02',
                      utilities: '2119.97',
                      waterAndSewer: '5.0',
                      trashRemoval: '125.02',
                      professionalFees: '299.98',
                      advertising: '500.01',
                      landscaping: '0.0',
                      capex: '7.0',
                      otherExpenses: '999.99',
                      equipmentDepreciation: '0.0',
                      incomeTaxRate: '1.0'
                  },
                  closingCost: {
                      originationFee: '30000.0',
                      processingFee: '400.0',
                      discountPoints: '0.0',
                      underwritingFee: '500.0',
                      appraisal: '425.0',
                      creditReport: '35.0',
                      floodCertificate: '0.0',
                      taxServices: '75.0',
                      titleInsurance: '175.0',
                      titleFees: '180.0',
                      survey: '175.0',
                      governmentRecordingCharges: '125.0',
                      transferTaxes: '0.0',
                      homeownersInsurance: '1100.0',
                      settlementCompanyCharges: '175.0',
                      wireCharges: '55.0'
                  },
                  incomeAndCostProjection: {
                      rentIncreases: %w(0.0 3.0 3.5 3.0 3.0),
                      operatingExpenseIncreases: %w(0.0 -2.0 -1.0 1.5 2.0)
                  }
              }
          }

          expect(response.status).to eq(403)
        end
      end
    end

    describe '#destroy' do
      describe 'when the user is updating his own property' do
        it 'returns a 200' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
          delete '/api/rental_properties/2'

          expect(response.status).to eq(200)
        end
      end

      describe 'when the user is updating a property owned by someone else' do
        it 'returns a 403' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
          delete '/api/rental_properties/3'

          expect(response.status).to eq(403)
        end
      end
    end
  end
end
