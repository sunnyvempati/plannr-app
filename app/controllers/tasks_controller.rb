class TasksController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = Task.all
    @header = "Tasks"
  end

  def show
    @header = "Task"
  end

  def new
    @task = Task.new
    @header = "Create Task"
  end

  def edit
    @header = "Edit Task"
  end

  def create
    modified_entity_params = task_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(deadline))
    modified_entity_params = add_owner_id_to_entity_params(modified_entity_params, @current_user.id)

    @task = Task.new(modified_entity_params)
    render_entity @task
  end

  def update
    modified_entity_params = task_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(deadline))

    @task.assign_attributes(modified_entity_params)
    render_entity @task
  end

  def event_tasks
    render_success Task.all.where(event_id: params[:event_id])
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_destroy
    render_success Task.destroy_all(id: mass_destroy_params[ids])
  end

  private
  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :deadline, :event_id)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

end
