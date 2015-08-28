class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :email, :company, :token

  has_one :sender, :recipient
end
