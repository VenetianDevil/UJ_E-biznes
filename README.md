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

# cypress
requires WSL2 (but React works better on WSL1, on WSL2 there is problem with auto recompiling)
```
wsl --set-version Ubuntu-18.04 2
```

from main dir
```
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
npx cypress open
```

# sonar cloud
https://sonarcloud.io/project/overview?id=VenetianDevil_UJ_E-biznes
