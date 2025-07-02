FROM node:16-alpine
WORKDIR /app
COPY package.json tsconfig.json tailwind.config.cjs postcss.config.cjs vite.config.ts ./
RUN npm ci
COPY src ./src
CMD ["npm", "run", "dev"]