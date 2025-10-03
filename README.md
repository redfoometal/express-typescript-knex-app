## 📌 Описание

Этот проект представляет собой тестовое задание для системы бронирования мест.

## 🚀 Запуск проекта

### 1. Убедитесь, что у вас установлен Docker

Если у вас еще не установлен Docker, скачайте и установите его с [официального сайта](https://www.docker.com/).

### 2. Склонируйте репозиторий

```sh
git clone https://github.com/redfoometal/express-typescript-knex-app
cd express-typescript-knex-app
```

### 3. Настройка переменных окружения

В корневой директории находится файл `.env.example`, который содержит список необходимых переменных окружения. Вам нужно скопировать его и создать свой `.env` файл:

```sh
cp .env.example .env
```

### 4. Соберите и запустите контейнер

```sh
docker compose up -d
```

### 5. Запуск seed файлов

```sh
docker compose run --rm app npx knex --knexfile dist/knex/knexfile.js seed:run
```

### 6. Остановка контейнера

```sh
docker compose down
```
