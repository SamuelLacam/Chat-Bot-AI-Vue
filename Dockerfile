FROM mysql
WORKDIR /db
COPY ./docker/init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
CMD ["mysqld"]