FROM ubuntu:20.04

RUN apt-get update -y

RUN apt-get install wget -y
RUN apt-get install vim -y
RUN apt-get install curl -y

RUN wget https://go.dev/dl/go1.17.8.linux-amd64.tar.gz

RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.8.linux-amd64.tar.gz

ENV PATH=$PATH:/usr/local/go/bin
RUN echo "export PATH=$PATH" > /etc/environment

RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b /usr/local/go/bin v1.44.2

RUN useradd -ms /bin/bash goradocker
RUN adduser goradocker sudo

USER goradocker

WORKDIR /home/goradocker
