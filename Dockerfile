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

# Delete dev deps
RUN apk del python3 g++ make cairo-dev pango-dev

# Copy required files for server
COPY ./js ./js
COPY ./src ./src
COPY ./api ./api

EXPOSE 8080
CMD [ "node", "api/index.js" ]
