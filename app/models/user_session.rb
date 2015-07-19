class UserSession < Authlogic::Session::Base
  validate :check_if_verified

  private

  def check_if_verified
    errors.add(:email, "You have not yet verified your email.") unless attempted_record && attempted_record.verified
  end
end
