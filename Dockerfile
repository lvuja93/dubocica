# --- deps ---
    FROM node:24-alpine AS deps
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    
    # --- build ---
    FROM node:24-alpine AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npm run build
    
    # --- runtime ---
    FROM node:24-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV HOST=0.0.0.0
    ENV PORT=3000
    
    # Kopiramo build i node_modules
    COPY --from=builder /app ./
    
    # Kopiramo entrypoint skript
    COPY docker-entrypoint.sh /app/docker-entrypoint.sh
    RUN chmod +x /app/docker-entrypoint.sh
    
    EXPOSE 3000
    
    # Umesto direktnog npm start, koristimo entrypoint
    CMD ["/app/docker-entrypoint.sh"]
    