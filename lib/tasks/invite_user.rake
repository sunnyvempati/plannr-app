desc "Invite user to Plannr"
task :invite_user, [:email] => [:environment] do |t, args|
  invite = Invitation.new(email: args[:email])
  if invite.save
    url = Rails.application.routes.url_helpers.sign_up_url(host: "localhost:3000", invite_token: invite.token)
    UserMailer.plannr_invitation(invite.email, url).deliver_now
    puts "Successfully sent invitation to " + invite.email
  else
    puts invite.errors
  end
end
