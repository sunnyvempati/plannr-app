module EventHelpers
  def event_with_everything
    event = FactoryGirl.create(:event)
    5.times do
      FactoryGirl.create(:event_contact, event: event)
      FactoryGirl.create(:event_vendor, event: event)
      FactoryGirl.create(:task, event: event)
    end

    event
  end
end
