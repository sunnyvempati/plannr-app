desc "Invite user to Plannr"
task :invite_user, [:email] => [:environment] do |t, args|
  invite = Invitation.new(email: args[:email])
  if invite.save
    UserMailer.plannr_invitation(invite).deliver_now
    puts "Successfully sent invitation to " + invite.email
  else
    puts invite.errors
  end
end
