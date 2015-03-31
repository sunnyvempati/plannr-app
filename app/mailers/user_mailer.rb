class UserMailer < ApplicationMailer
  default from: 'sunny@yourplannr.com'

  def user_invitation(invite, url)
    @company = invite.company
    @url = url
    mail(to: invite.email, subject: "Plannr invitation")
  end

  def plannr_invitation(email, url)
    @url = url
    mail(to: email, subject: "Plannr invitation")
  end
end
