class UserMailer < ApplicationMailer
  default from: 'hello@yourplannr.com'

  def user_invitation(invite)
    @company = invite.company
    @url = sign_up_url(invite_token: invite.token)
    mail(to: invite.email, subject: "Invitation to Plannr")
  end

  def plannr_invitation(invite)
    @url = sign_up_url(invite_token: invite.token)
    mail(to: invite.email, subject: "Invitation to Plannr")
  end

  def reset_password_instructions(user)
    @url = reset_password_url(id: user.perishable_token)
    mail(to: user.email, subject: "Plannr password reset instructions")
  end

  def verification_instructions(user)
    @url = verify_url(id: user.perishable_token)
    mail(to: user.email, subject: "Plannr email verification instructions")
  end

  def notify_plannr(user)
    @user = user
    mail(to: 'support@yourplannr.com', subject: "New User Sign up")
  end
end
