## Create env
```
cp env.example .env
```
## Create network docker
```
docker network create dev_network
```
## Up container Postgres
```
docker-compose up -d --build
```
## Create database
## Example: nestjs_test
```
docker-compose exec -T postgresql /bin/bash -c "createdb nestjs_test"
```
## Down container Postgres
```
docker-compose down
```