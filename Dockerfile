FROM node:18.20 

WORKDIR /app 

COPY package*.json . 

RUN npm install 

COPY . . 

EXPOSE 9000 

ENTRYPOINT ["npm"]

CMD ["start", "--", "--port", "9000"]
