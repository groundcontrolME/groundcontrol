FROM fernandosanchez/appstudio:node694

COPY ./src/ /usr/local/apache2/htdocs/
COPY ./src/cert/* /usr/local/apache2/conf/

ENTRYPOINT /opt/node/bin/node /usr/local/apache2/htdocs/server.js
