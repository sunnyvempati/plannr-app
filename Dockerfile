# Instructions taken from phusion/passenger docker base image
FROM phusion/passenger-customizable:0.9.17

ENV HOME /root
CMD ["/sbin/my_init"]

RUN /pd_build/utilities.sh
RUN /pd_build/ruby2.2.sh
RUN /pd_build/nodejs.sh

# Plannr-specific build instructions
RUN mkdir -p /home/app/plannr

WORKDIR /home/app/plannr

ENV BUNDLE_PATH /home/app/.bundle
COPY Gemfile Gemfile.lock /home/app/plannr/
RUN bundle install

COPY . /home/app/plannr/
RUN npm install bower && bundle exec rake bower:install[--allow-root]

RUN mkdir /etc/service/plannr
ADD docker/start.sh /etc/service/plannr/run

EXPOSE 3000

# Clean up APT when done.
RUN apt-get clean && rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/* \
    /home/app/plannr/log/* \
    /home/app/plannr/public/uploads/*
