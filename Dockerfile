FROM node:16.16.0-alpine
WORKDIR /home/node/app
COPY . .
USER root
RUN npm ci && npm cache clean --force \
    npm i -g @nestjs/cli

RUN npm run build
EXPOSE 3000
CMD npm run start:dev
