class SessionsController < Devise::SessionsController

  protected

  def after_sign_in_path_for(resource)
    current_user.profile ? root_path : new_profile_path
  end

  def resource_params
    binding.pry
    return_val = params.fetch(resource_name, {})
  end
end
