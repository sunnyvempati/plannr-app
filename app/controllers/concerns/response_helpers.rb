module ResponseHelpers
  def render_created(entity)
    render entity, status: 200
  end

  def render_entity(entity)
    if entity.save
      yield if block_given?
      respond_with entity
    else
      render json: errors_hash(entity.errors), status: 403
    end
  end

  def render_error(message)
    render json: {error_message: message}, status: 403
  end

  def errors_hash(entity_errors)
    errors = {}
    entity_errors.messages.each {|k,v| errors[k] = v.first}
    errors
  end

  def render_success(json={})
    render json: json, status: 200
  end

  def render_redirect(url)
    render json: {redirect_to: url}, status: 307
  end
end
