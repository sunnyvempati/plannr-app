class UserSessionSerializer < ActiveModel::Serializer
  attributes :user_id, :token

  def token
    object.attempted_record.persistence_token
  end

  def user_id
    object.user.id
  end
end
