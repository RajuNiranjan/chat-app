.PHONY: dev app api build

dev:
	npm run dev --prefix backend
	npm run dev --prefix frontend

app/dev:
	npm run dev --prefix frontend

api/dev:
	npm run dev --prefix backend

build:
	npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend 
