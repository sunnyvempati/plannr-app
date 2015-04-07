class CompanyUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :company_admin, :name

  def name
    object.profile.full_name if object.profile
  end
end
