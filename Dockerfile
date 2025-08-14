# --- deps ---
    FROM node:24-alpine AS deps
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    
    # --- build ---
    FROM node:24-alpine AS builder
    WORKDIR /app
    RUN apk add --no-cache openssl libc6-compat   
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY prisma ./prisma                          
    RUN npx prisma generate                       
    COPY . .
    RUN npm run build
    
    # --- runtime ---
    FROM node:24-alpine AS runner
    WORKDIR /app
    RUN apk add --no-cache libc6-compat
    ENV NODE_ENV=production
    ENV HOST=0.0.0.0
    ENV PORT=3000
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/prisma ./prisma
    EXPOSE 3000
    CMD ["npm","run","start","--","-p","3000","-H","0.0.0.0"]
    