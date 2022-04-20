```
npm i
```

# Docker
with Dockerfile
```
docker build . -t user_name/ebiz:latest
docker login
docker push user_name/ebiz:latest
```

## RUN image
```
docker imges
docker run -it user_name/ebiz:latest /bin/bash
```
-i dla inteaktywności

## PULL docker repo
```
docker pull goradocker/ebiz
```

# golangci-lint

follow instalation  https://golangci-lint.run/usage/install/

```
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.44.2
```

add Path environment using '.bash_profile' file
```
sudo nano ~/.bash_profile
```
write: **export PATH=$PATH:$(go env GOPATH)/bin** and save file

then reload *# User specific environment and startup programs*
```
source ~/.bash_profile
```

# scala play crud
```
cd ebiz-play-scala-crud
sbt run
```

localhost:9000


# kotlin ktor slack bot
run project and ngrok to listen for post requests from slack commands

```
ngrok http 8080
```