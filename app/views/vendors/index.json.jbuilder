json.array!(@vendors) do |vendor|
  json.extract! vendor, :id, :name, :location, :phone, :primary_contact
  json.url vendor_url(vendor, format: :json)
end
