package com.slackbot

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.slack.api.Slack

fun Routing.homeRoute() {
    val token = System.getenv("SLACK_TOKEN")
    val slack = Slack.getInstance()

    get("/") {
        val response = slack.methods(token).chatPostMessage {
            it.channel("#general")
                .text("Hello :wave:")
        }
        call.respondText("Response is: $response")
    }

}
