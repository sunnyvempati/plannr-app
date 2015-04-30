class ProfileSerializer < ActiveModel::Serializer
  attributes :name

  def name
    "#{object.first_name} #{object.last_name}"
  end
end
