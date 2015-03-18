module ResponseHelpers
  def render_created(entity)
    render entity, status: 200
  end

  def render_entity(entity)
    if entity.save
      respond_with entity
    else
      render json: errors_hash(entity.errors), status: 403
    end
  end

  def render_error(hash)
    render json: hash, status: 403
  end

  def errors_hash(entity_errors)
    errors = {}
    entity_errors.messages.each {|k,v| errors[k] = v.first}
    errors
  end
end

