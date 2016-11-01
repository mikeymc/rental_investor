class UserSerializer < ActiveModel::Serializer
  attributes :id

  has_many :rental_property
end
