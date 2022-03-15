FROM ubuntu:20.04

RUN apt-get update -y

RUN apt-get install wget -y
RUN apt-get install vim -y

RUN wget https://go.dev/dl/go1.17.8.linux-amd64.tar.gz

RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.8.linux-amd64.tar.gz

ENV PATH=$PATH:/usr/local/go/bin

RUN echo "export PATH=$PATH" > /etc/environment

RUN useradd -ms /bin/bash goradocker
RUN adduser goradocker sudo

USER goradocker

WORKDIR /home/goradocker
