RSpec.shared_context 'controller_init' do
  setup :activate_authlogic

  let(:user) { FactoryGirl.create(:user) }

  before do
    ActsAsTenant.current_tenant = user.company
    login user
  end
end
