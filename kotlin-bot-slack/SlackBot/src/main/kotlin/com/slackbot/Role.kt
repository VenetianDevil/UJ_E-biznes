package com.slackbot

class Role (
    val id: Int,
    val type: String,
) {
    override fun toString(): String {
        return "Role [id: ${this.id}, type: ${this.type}]"
    }
}