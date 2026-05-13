# Spring 5 Base Project

Base Java dùng Spring Boot 2.7.x, tương ứng Spring Framework 5.x.

Luồng xử lý:

```text
client -> nginx -> controller -> service -> response -> database(mysql)
```

## Chạy bằng Docker

```bash
docker compose up --build
```

Frontend chạy qua Nginx tại:

```text
http://localhost/
```

API chạy qua Nginx tại:

```text
http://localhost/api/users
```

## API mẫu

Tạo user:

```bash
curl -X POST http://localhost/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nguyen Van A\",\"email\":\"a@example.com\"}"
```

Lấy user:

```bash
curl http://localhost/api/users/1
```

## Cấu trúc chính

```text
frontend
├── index.html
├── styles.css
└── app.js

src/main/java/com/example/base
├── controller
├── service
├── response
├── repository
├── entity
├── dto
└── exception
```

## Database

MySQL được cấu hình trong `docker-compose.yml`.

Thông tin mặc định:

```text
database: base_db
user: base_user
password: base_password
root password: root_password
```
