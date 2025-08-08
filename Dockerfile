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
    COPY --from=builder /app ./
    EXPOSE 3000
    # Forsira port/host i kad "npm start" ne prosleđuje -p/-H
    CMD ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]
    