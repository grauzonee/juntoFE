build:
	docker-compose up -d --build 
up:
	docker-compose up -d --build 
down:
	docker-compose down 
logs:
	docker logs junto_react
open:
	docker exec -it junto_react sh
