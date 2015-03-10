# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'plannr-app'
set :repo_url, 'git@github.com:sunnyvempati/plannr-app.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/deployer/apps/plannr-app'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

set :ssh_options, { keys: ["~/.ssh/plannr_deployer"] }

set :rbenv_type, :user
set :rbenv_ruby, File.read('.ruby-version').strip

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
set :linked_dirs, fetch(:linked_dirs, []).push('vendor/assets/bower_components')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 3

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  desc 'copy bower_components to server'
  task :copy_bower do
    on roles(:all) do |host|
      upload! 'vendor/assets/bower_components/', shared_path.join('vendor/assets/'), recursive: true
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
