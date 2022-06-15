FROM golang:1.18-buster

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o gormapi

EXPOSE 1323

CMD [ "./gormapi" ]