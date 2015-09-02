#! /bin/bash
echo "Initialization file at:";
echo " - [compose-project]/volumes/postgres/docker-entrypoint-initdb.d/010_create_project_databases.sh";
echo "Operation: CREATING PROJECT DATABASES";

gosu postgres postgres --single <<-EOSQL
   CREATE DATABASE plannr_development;
   CREATE DATABASE plannr_test;
EOSQL

echo "";
echo "PROJECT DATABASES CREATED";
