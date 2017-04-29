FROM fernandosanchez/appstudio:node694

COPY . /usr/local/apache2/htdocs/
COPY ./cert/* /usr/local/apache2/conf/

EXPOSE 80 443 5500

CMD /opt/node/bin/node /usr/local/apache2/htdocs/server.js
