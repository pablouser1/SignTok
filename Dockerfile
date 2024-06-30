FROM node:20-alpine
WORKDIR /usr/src/app

# Setup Alpine for canvas
RUN apk add --no-cache \
    # Build only
    python3 g++ make cairo-dev pango-dev \
    # Runtime
    cairo pango

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy required files for server
COPY ./src ./src
COPY ./api ./api
COPY ./js ./js

RUN apk del python3 g++ make cairo-dev pango-dev

EXPOSE 8080
CMD [ "node", "api/index.js" ]
