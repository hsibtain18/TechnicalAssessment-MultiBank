FROM node:20.19.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=4000
ENV JWT_SECRET=change_this_at_runtime

EXPOSE 4000

CMD ["npm", "start"]