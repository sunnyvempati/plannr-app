class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :company_admin, :name

  has_one :company
  has_one :profile

  def name
    object.profile.full_name if object.profile
  end
end
