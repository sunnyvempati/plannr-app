json.users @users do |user|
  json.first_name user.profile.first_name
  json.last_name user.profile.last_name
  json.email user.email
  json.company user.company.name
  json.company_id user.company_id
  json.created_at user.created_at
  json.last_login_at user.last_login_at
  json.login_count user.login_count
end
