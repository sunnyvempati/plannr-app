class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :email, :recipient

  has_one :sender, :recipient
end
