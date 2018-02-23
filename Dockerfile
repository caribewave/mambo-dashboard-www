FROM nginx:1.10-alpine

COPY build/ /usr/share/nginx/html/
COPY conf/default.conf /etc/nginx/conf.d/default.conf