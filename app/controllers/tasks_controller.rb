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
    @header = "Create Task"
    @task = Task.new
  end

  def edit
    @header = "Edit Task"
  end

  def create
    @task = Task.new task_params
    render_entity @task
  end

  def update
    @task.assign_attributes task_params
    render_entity @task
  end

  def event_tasks
    render_success Task.event_tasks(params[:event_id])
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
    @task = Task.includes(:assigned_to).find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :deadline, :event_id, :assigned_to_id).merge(owner: current_user)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
