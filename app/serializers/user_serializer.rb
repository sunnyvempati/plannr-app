class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :company_admin, :name, :company_name, :admin

  has_one :company
  has_one :profile

  def name
    object.profile.full_name if object.profile
  end

  def company_name
    object.company.name
  end
end
