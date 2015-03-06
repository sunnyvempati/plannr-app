require 'rails_helper'

feature 'Sign in', :devise do
  given(:user) { FactoryGirl.create(:profile).user }

  scenario "user can sign in", js: true do
    sign_in(user)
  end
end
