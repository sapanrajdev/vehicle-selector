FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
EXPOSE 5000
ENV NODE_ENV=production
CMD ["npm", "start"]
