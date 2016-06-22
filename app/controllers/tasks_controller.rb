class TasksController < ApplicationController
  include FilterSort
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = params[:page] ? @filter_sort.find.page(params[:page]) : @filter_sort.find
    render_success @tasks
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
    @task = Task.new task_params.except!(:notify_user)
    @task.status = 1 # TODO
    render_entity @task do |task|
      user = User.find task_params[:assigned_to_id]
      task.send_to(user) if user
    end
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
    params.require(:task).permit(:name, :notify_user, :deadline, :event_id, :assigned_to_id, :status, :description).merge(owner: current_user)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  # required for FilterSort
  def model
    Task
  end
end
