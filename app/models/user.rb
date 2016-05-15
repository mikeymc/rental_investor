class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  before_save :skip_confirmation

  has_many :rental_properties

  def skip_confirmation
    self.skip_confirmation!
  end
end
