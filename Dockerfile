FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY prisma ./prisma/

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
