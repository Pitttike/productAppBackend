FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache openssl libc6-compat netcat-openbsd

# Copy package files and install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    npm install

# Copy application code
COPY . .

# Copy and make start script executable
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

EXPOSE 3000

CMD ["/app/start.sh"]