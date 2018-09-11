FROM ubuntu:18.04
RUN apt update && apt install -y nginx curl  build-essential
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh
RUN apt update &&  apt install -y nodejs
#RUN node -v && npm -v

ENV APP_PATH /var/www
COPY nginx/default.conf /etc/nginx/sites-enabled/default
#Angular CLI
RUN npm install -g @angular/cli
COPY . /var/frontend
WORKDIR /var/frontend
RUN npm install
RUN ng build --prod
RUN rm -rf /var/www/*
RUN mv dist/kupping-frontend/* /var/www

CMD ["nginx","-g", "daemon off;"]