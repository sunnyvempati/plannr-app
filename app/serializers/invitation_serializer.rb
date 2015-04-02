class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :email, :recipient

  has_one :sender
end
