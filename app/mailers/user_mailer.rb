class UserMailer < ApplicationMailer
  default from: 'hello@yourplannr.com'

  def user_invitation(invite)
    @company = invite.company
    @url = root_url + "#/sign_up?invite_token=#{invite.token}"
    mail(to: invite.email, subject: "Invitation to Plannr")
  end

  # no more plannr invites
  # def plannr_invitation(invite)
  #   @url = sign_up_url(invite_token: invite.token)
  #   mail(to: invite.email, subject: "Invitation to Plannr")
  # end

  def reset_password_instructions(user)
    @url = root_url + "#/reset_password?id=#{user.perishable_token}"
    mail(to: user.email, subject: "Plannr password reset instructions")
  end

  def verification_instructions(user)
    @url = root_url + "#/verify?id=#{user.perishable_token}"
    mail(to: user.email, subject: "Plannr email verification instructions")
  end

  def notify_plannr(user)
    @user = user
    mail(to: 'support@yourplannr.com', subject: "New User Sign up")
  end
end
