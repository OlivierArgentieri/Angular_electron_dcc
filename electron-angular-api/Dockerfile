FROM node:alpine


# Create app directory
WORKDIR ./app
COPY  ./package.json ./
COPY  ./tsconfig.json ./
RUN npm install
COPY ./src ./src

# Open PORT
EXPOSE 3000

CMD ["npm","start"]