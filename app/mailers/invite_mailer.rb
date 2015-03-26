class InviteMailer < ApplicationMailer
  default from: 'sunny@yourplannr.com'

  def user_invitation(invite, url)
    @company = invite.company
    @url = url
    mail(to: invite.email, subject: "Plannr invitation")
  end
end
