# Build stage
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Development stage

FROM node:24-alpine AS development
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 3000

COPY . .
CMD ["npm", "run", "dev"]
