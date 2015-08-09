class UserSessionSerializer < ActiveModel::Serializer
  attributes :token, :user_id, :user_email, :user_first, :user_last

  def token
    object.attempted_record.persistence_token
  end

  def user_id
    object.user.id
  end

  def user_email
    object.user.email
  end

  def user_first
    object.user.profile.first_name
  end

  def user_last
    object.user.profile.last_name
  end
end
