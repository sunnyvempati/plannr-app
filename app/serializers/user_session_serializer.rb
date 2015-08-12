class UserSessionSerializer < ActiveModel::Serializer
  attributes :user, :token

  def token
    object.attempted_record.persistence_token
  end

  def user
    session_user = object.user
    {
      id: session_user.id,
      email: session_user.email,
      first_name: session_user.profile && session_user.profile.first_name,
      last_name: session_user.profile && session_user.profile.last_name
    }
  end
end
