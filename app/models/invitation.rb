class Invitation < ActiveRecord::Base
  acts_as_tenant :company
  before_create :generate_token

  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  validate :user_cannot_exist, on: :create

  validates :email, uniqueness: true

  # invite hasn't been accepted yet
  scope :active_invites, -> { where(recipient: nil) }

  def generate_token
    self.token = Digest::SHA1.hexdigest([self.company_id, Time.now, rand].join)
  end

  def user_cannot_exist
    errors.add(:email, "is already a user of Plannr") if self.email && User.find_by_email(self.email)
  end

  def deliver_sign_up_instructions
    UserMailer.user_invitation(self).deliver_now
  end
end
