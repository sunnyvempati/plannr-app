#!/bin/bash

if [ -z "$DOCKER_HOST" ]; then
    DOCKER_HOST_IP='localhost'
else
    DOCKER_HOST_IP=`echo $DOCKER_HOST | sed -E 's/tcp:\/\/([0-9]{2,3}.[0-9]{2,3}.[0-9]{2,3}.[0-9]{2,3}):.*/\1/'`
fi


echo "DOCKER HOST IS: ${DOCKER_HOST_IP}"

export DATABASE_URL="postgres://postgres:plannr@${DOCKER_HOST_IP}:5432/plannr_development?pool=5&encoding=unicode"
export SECRET_KEY_BASE='53e47c5e0272188f533e9dfdd46faa69be4a14a126c98863eb55ce131efa01d350b4e3cf363822646ddd959ebafe677b2c8b2815ca5988cd1c0984b414c35ef6'

# Influxdb settings
export PLANNR_INFLUXDB_HOST=${DOCKER_HOST_IP}
export PLANNR_INFLUXDB_USER='admin'
export PLANNR_INFLUXDB_PASS='plannr12'
export PLANNR_INFLUXDB_DB='metrics'

# Logstash settings
export PLANNR_LOGSTASH_HOST=${DOCKER_HOST_IP}
export PLANNR_LOGSTASH_PORT=9999

# Elasticsearch settings
export PLANNR_ELASTIC_HOST=${DOCKER_HOST_IP}
export PLANNR_ELASTIC_PORT=9200
