# Dockerfile for Player_Microservice
# This uses a multi-stage build to create a small and secure production image.

# --- Build Stage ---
FROM node:18-slim AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

# --- Production Stage ---
FROM node:18-slim
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*
RUN groupadd --system nodeuser && useradd --system --gid nodeuser nodeuser
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY . .
RUN chown -R nodeuser:nodeuser /usr/src/app
USER nodeuser

# Expose the internal port for service-to-service communication
EXPOSE 5003

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "index.js"]
