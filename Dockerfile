### STAGE 1: Build ###
FROM node:10-alpine as builder
COPY package.json package-lock.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run ng build -- --prod --output-path=dist

### STAGE 2: Setup ###
FROM nginx:1.17.3
RUN mkdir /etc/nginx/creds
EXPOSE 80 443
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /tmp

COPY nginx/fullchain.pem /etc/nginx/creds/
COPY nginx/privkey.pem /etc/nginx/creds/

COPY --from=builder /ng-app/dist /usr/share/nginx/html
CMD sh -c "envsubst '\$BACKEND_URL' < /tmp/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"