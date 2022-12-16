from node:18

RUN apt update
RUN apt install -y chromium

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENTRYPOINT ["node", "__tests__/index.js"]


