FROM node:22.18.0-alpine AS builder

WORKDIR /src

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# ---- Production image ----
FROM node:22.18.0-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /src

# Копируем скомпилированные файлы из builder-а
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package*.json ./


# Запускаем приложение
CMD ["sh", "-c", "npx knex --knexfile dist/knex/knexfile.js migrate:latest && node dist/main.js"]
