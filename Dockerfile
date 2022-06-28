FROM node:18-alpine
WORKDIR /usr/src/app

# Setup Alpine for building "canvas" package
RUN apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 8080
CMD [ "node", "api/index.js" ]
