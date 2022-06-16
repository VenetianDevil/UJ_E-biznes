# SonarCloud (VIII)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=VenetianDevil_UJ_E-biznes&metric=bugs)](https://sonarcloud.io/summary/new_code?id=VenetianDevil_UJ_E-biznes)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=VenetianDevil_UJ_E-biznes&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=VenetianDevil_UJ_E-biznes)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=VenetianDevil_UJ_E-biznes&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=VenetianDevil_UJ_E-biznes)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=VenetianDevil_UJ_E-biznes&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=VenetianDevil_UJ_E-biznes)

# Azure + GithubActions (IX)
react and go app with sqlite deployed
+ logging not working because of cookies, but you can see it's connected to github and google

https://ebiz.azurewebsites.net/products


# Docker (I)
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

# scala play crud (II)
```
cd ebiz-play-scala-crud
sbt run
```

localhost:9000


# kotlin ktor slack bot (III)
run project and ngrok to listen for post requests from slack commands

```
ngrok http 8080
```

# gorm (IV) + react (V) (backend + frontend --> go to IX to see that they work together) + Oauth2 in go app (VII) 
Backend gorm-echo works with react\ebizproj frontend and mySQL database (database.sql)

Using WSL2 check the host IP
```
export WSL_HOST_IP=$(awk '/nameserver/ { print $2 }' /etc/resolv.conf)
echo $WSL_HOST_IP
```
end put in in the gorm-echo/config/config.json file under DB_HOST.

If you are using WSL1 then just use 127.0.0.1.

# cypress (VI)
requires WSL2 (but React works better on WSL1, on WSL2 there is problem with auto recompiling)
```
wsl --set-version Ubuntu-18.04 2
```

from main dir
```
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
npx cypress open
```
