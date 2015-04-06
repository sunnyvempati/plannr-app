module ParamHelpers
  include DateHelpers
  def add_owner_id_to_entity_params(entity_params, current_user_id)
    #populate the current_user_id in the owner_id property
    modified_entity_params = entity_params
    modified_entity_params.merge!(:owner_id =>  current_user_id)   
  end

  def convert_date_params_to_date_type(entity_params, date_field_names)
    # change date params from string to date
    modified_entity_params = entity_params
    date_field_names.each do |date_field_name|
      modified_entity_params.except!(date_field_name)
      modified_entity_params.merge!(date_field_name => convert_us_formatted_string_to_date_type(entity_params[date_field_name]))
    end
    return modified_entity_params
  end
end
