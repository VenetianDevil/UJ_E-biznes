package com.slackbot

class Champion(
    val id: Int,
    val typeId: Int,
    val name: String,
    val desc: String
) {
    override fun toString(): String {
        return "Champion [id: ${this.id}, typeId: ${this.typeId}, name: ${this.name}, desc: ${this.desc}]"
    }

}