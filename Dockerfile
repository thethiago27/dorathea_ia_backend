FROM node:16

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./

COPY . .

RUN npm install -g pnpm
RUN pnpm install

RUN npx prisma generate

EXPOSE 3001

CMD ["pnpm", "run", "start"]


