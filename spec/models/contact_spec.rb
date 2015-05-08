require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:contact) {FactoryGirl.build(:contact)}


  it "has a valid factory" do
    expect(contact).to be_valid
  end

  it "is invalid without a name" do
    expect(FactoryGirl.build(:contact, name: nil)).to_not be_valid
  end

  describe " Validations " do

    describe " Email Validations" do

      [nil, 'billy@gmail.com', 'billy@gmail.net', 'billy.stuff@gmail.net'].each do |valid_email|
        it "is valid with #{valid_email} email" do
          expect(FactoryGirl.build(:contact, email: valid_email)).to be_valid
        end
      end

      it "is invalid without .com at end of email" do
        expect(FactoryGirl.build(:contact, email:'billy@gmail')).to_not be_valid
      end

   end


   describe " Phone Validations " do

    [nil, '815-968-2311', '8159682311', '1-815-968-2311'].each do |valid_phone|
      it "is valid with #{valid_phone} phone" do
        expect(FactoryGirl.build(:contact, phone: valid_phone)).to be_valid
      end
    end

    it "is invalid with a 9 digit number" do
      expect(FactoryGirl.build(:contact, phone: '815-968-231')).to_not be_valid
    end

    it "is invalid with a 9 digit number without dashes" do
      expect(FactoryGirl.build(:contact, phone: '815968231')).to_not be_valid
    end

  end

end

end
