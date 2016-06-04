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
          properties = JSON.parse(response.body)

          expect(properties.size).to eq 2
          properties.each do |property|
            expect(property['user_id']).to eq(1)
          end
        end
      end

      describe 'when another user is signed in' do
        it 'fetches properties for that user' do
          @user = User.new(id: 2)
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)

          get '/api/rental_properties'
          properties = JSON.parse(response.body)

          expect(properties.size).to eq 1
          properties.each do |property|
            expect(property['user_id']).to eq(2)
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
          property = JSON.parse(response.body)
          expect(property['id']).to eq(1)
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
            rental_property: {
              id: 2,
              financing_and_income_assumption: {foo: 'bar'},
              operating_expenses_assumption: {foo: 'bar'},
              income_and_cost_projection: {foo: 'bar'},
              questionnaire: {foo: 'bar'}
            }
          }

          expect(response.status).to eq(200)
        end
      end

      describe 'when the user is updating a property owned by someone else' do
        it 'returns a 403' do
          allow_any_instance_of(Api::RentalPropertiesController).to receive(:current_user).and_return(@user)
          put '/api/rental_properties/3', {
            rental_property: {
              id: 3,
              financing_and_income_assumption: {foo: 'bar'},
              operating_expenses_assumption: {foo: 'bar'},
              income_and_cost_projection: {foo: 'bar'}
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
