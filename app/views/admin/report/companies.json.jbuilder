json.companies @companies do |company|
  json.id company.id
  json.name company.name
  json.user_count company.user_count
  json.event_count company.event_count
  json.task_count company.task_count
  json.contact_count company.contact_count
  json.vendor_count company.vendor_count
  json.attachment_count company.attachment_count
end
