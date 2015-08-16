# Instructions taken from phusion/passenger docker base image
FROM phusion/passenger-customizable:0.9.17

ENV HOME /root
CMD ["/sbin/my_init"]

RUN /pd_build/utilities.sh
RUN /pd_build/ruby2.2.sh
RUN /pd_build/nodejs.sh

ENV HOME /home/app

# Plannr-specific build instructions
RUN mkdir -p /home/app/plannr
WORKDIR /home/app/plannr

ENV BUNDLE_PATH /home/app/.bundle
COPY Gemfile /home/app/plannr/
COPY Gemfile.lock /home/app/plannr/
RUN bundle install

COPY . /home/app/plannr/

RUN npm install -g bower
RUN bundle exec rake bower:install[--allow-root]

EXPOSE 3000

CMD ["passenger", "start"]

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
