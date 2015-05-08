module SessionHelpers

  def login(user)
    UserSession.create(user)
  end

end
