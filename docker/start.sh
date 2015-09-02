#!/bin/bash
cd /home/app/plannr

echo "BUNDLE PATH: ${BUNDLE_PATH}"
echo "PWD: `pwd`"
echo "WHOAMI: `whoami`"

bundle exec rake db:create
bundle exec rake db:migrate

exec passenger start
