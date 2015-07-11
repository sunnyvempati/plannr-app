class TasksController < ApplicationController
  include FilterSort
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    serializer = filter_sort_params && filter_sort_params[:with_event_id] ? TaskSerializer : TaskWithEventSerializer
    @tasks = @filter_sort.find
    respond_to do |format|
      format.html
      format.json { render json: @tasks, each_serializer: serializer }
    end
  end

  def show
    render_success @task
  end

  def new
    @task = Task.new
  end

  def edit
  end

  def create
    @task = Task.new task_params
    @task.status = 1 # TODO
    render_entity @task
  end

  def update
    @task.assign_attributes task_params
    render_entity @task
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_destroy
    render_success Task.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def set_task
    @task = Task.includes(:assigned_to).find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :deadline, :event_id, :assigned_to_id, :status, :description).merge(owner: current_user)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  # required for FilterSort
  def model
    Task
  end
end
