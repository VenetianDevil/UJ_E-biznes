package com.slackbot

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.slackbot.plugins.*
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting()
        configureSerialization()
    }.start(wait = true)

}

