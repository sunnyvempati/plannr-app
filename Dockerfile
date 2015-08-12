# Instructions taken from phusion/passenger docker base image
FROM phusion/passenger-full:0.9.17
ENV HOME /root
CMD ["/sbin/my_init"]
RUN /pd_build/utilities.sh
RUN /pd_build/ruby2.2.sh
RUN /pd_build/nodejs.sh

# Plannr-specific build instructions
USER app
RUN mkdir -p /home/app/plannr
WORKDIR /home/app/plannr
COPY Gemfile /home/app/plannr
COPY Gemfile.lock /home/app/plannr
RUN bundle install
COPY . /home/app/plannr
RUN bundle exec rake bower:install

EXPOSE 3000

CMD ["passenger", "start", "--environment", "staging"]

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
