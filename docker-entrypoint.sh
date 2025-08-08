#!/bin/sh
set -e

echo "🚀 Pokrećem Prisma migracije..."
npx prisma migrate deploy

echo "✅ Migracije gotove, pokrećem Next.js..."
npm run start -- -p 3000 -H 0.0.0.0
