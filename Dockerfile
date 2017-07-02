FROM nginx

COPY src /app
RUN chmod 755 -R /app

COPY nginx/demo.conf /etc/nginx/conf.d/demo.conf

