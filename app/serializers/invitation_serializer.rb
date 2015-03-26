class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :email, :sender

  def sender
    UserSerializer.new(sender, scope: scope, root: false)
  end
end
