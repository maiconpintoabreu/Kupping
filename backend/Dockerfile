FROM node:10.9.0-alpine

RUN apk repo update && apk add curl
WORKDIR /backend-kupping
RUN npm install


EXPOSE 80 443

CMD ["npm","run-script","run"]
