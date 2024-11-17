# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node package*.json ./

RUN npm ci --only=production --quiet \
    && npm cache clean --force

RUN rm -rf /root/.npm

USER node
EXPOSE 4000
CMD ["node", "dist/src/main.js"]