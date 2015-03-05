module Features
  module SessionHelpers
    def sign_in(user)
      visit(root_path)
      find(:xpath, "//input[@label='email']").set(user.email)
      find(:xpath, "//input[@label='password']").set(user.password)
      click_button('login')
    end

    def sign_out
      # to do
    end
  end
end
