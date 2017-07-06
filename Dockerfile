FROM nginx

COPY src /app
RUN chmod 755 -R /app

COPY docker/nginx/demo.conf /etc/nginx/conf.d/demo.conf

