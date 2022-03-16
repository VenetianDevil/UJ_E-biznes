```
npm i
```

# Docker
with Dockerfile
```
docker build . -t nazwauz/ebiznes:latest
docker login
docker push nazwauz/ebiznes:latest
```

## RUN image
```
docker imges
docker run -it nameuz/ml2021:latest /bin/bash
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
