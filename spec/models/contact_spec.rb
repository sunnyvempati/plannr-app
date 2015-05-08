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

      it "is valid with nil email" do
        expect(FactoryGirl.build(:contact, email: nil)).to be_valid
      end

      it "is valid with billy@gmail.com email" do
       expect(FactoryGirl.build(:contact, email:'billy@gmail.com')).to be_valid
     end

     it "is valid with billy.stuff@gmail.com email" do
       expect(FactoryGirl.build(:contact, email:'billy.stuff@gmail.com')).to be_valid
     end

     it "is valid with billy.stuff@gmail.net email" do
       expect(FactoryGirl.build(:contact, email:'billy.stuff@gmail.net')).to be_valid
     end

     it "is invalid without .com at end of email" do
       expect(FactoryGirl.build(:contact, email:'billy@gmail')).to_not be_valid
     end

   end


   describe " Phone Validations " do

    it "is valid with nil phone" do
      expect(FactoryGirl.build(:contact, phone: nil)).to be_valid
    end

    it "is valid with phone for Amcore Bank Time and Temp" do
      expect(FactoryGirl.build(:contact, phone: '815-968-2311')).to be_valid
    end

    it "is valid with phone for Amcore Bank Time and Temp without dashes" do
      expect(FactoryGirl.build(:contact, phone: '8159682311')).to be_valid
    end

    it "is valid with phone for Amcore Bank Time and Temp with 1" do
      expect(FactoryGirl.build(:contact, phone: '1-815-968-2311')).to be_valid
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
