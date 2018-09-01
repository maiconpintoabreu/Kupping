FROM nginx:1.15-alpine

ENV APP_PATH /var/www
COPY /dist/kupping-frontend /var/www
WORKDIR /var/www
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx/default.conf /etc/nginx/conf.d/