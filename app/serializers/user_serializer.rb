class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :company_admin

  has_one :company
  has_one :profile
end
