FROM fernandosanchez/appstudio:node694

COPY . /usr/local/apache2/htdocs/
COPY ./cert/* /usr/local/apache2/conf/

CMD /opt/node/bin/node /usr/local/apache2/htdocs/server.js
