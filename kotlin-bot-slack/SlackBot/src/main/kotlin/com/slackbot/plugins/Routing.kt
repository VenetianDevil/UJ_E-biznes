package com.slackbot.plugins

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.slack.api.Slack
import com.slackbot.*
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.http.cio.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*

var championsJson = """[
  {
    "id": 0,
    "typeId": 0,
    "name": "Soraka",
    "desc": "Wędrowniczka z astralnych wymiarów ponad Górą Targon, Soraka porzuciła nieśmiertelność na rzecz obrony ras śmiertelników przed ich własnymi, bardziej brutalnymi instynktami."
  },
  {
    "id": 1,
    "typeId": 0,
    "name": "Morgana",
    "desc": "Rozdarta pomiędzy naturą astralną a naturą śmiertelniczki, Morgana związała swoje skrzydła, by otworzyć ramiona na ludzkość, i zadaje wszystkim nieszczerym i zwyrodniałym ból, jaki sama odczuwa."
  },
  {
    "id": 2,
    "typeId": 0,
    "name": "Lulu",
    "desc": "Yordlowa czarodziejka Lulu znana jest z tworzenia wyśnionych iluzji i niestworzonych stworzeń, przemierzając Runeterrę wraz ze swoim duszkiem towarzyszem Pixem."
  },
  {
    "id": 3,
    "typeId": 0,
    "name": "Lux",
    "desc": "Obrończyni Korony Luxanna pochodzi z Demacii, krainy, w której do zdolności magicznych podchodzi się z dystansem i strachem. Z powodu umiejętności władania światłem, dorastała w strachu przed tym, że ktoś odkryje jej zdolności i ją wygna."
  },
  {
    "id": 4,
    "typeId": 1,
    "name": "Ahri",
    "desc": "Ahri to Vastajanka naturalnie połączona z magią krążącą po Runeterze, która może zmieniać energię magiczną w kule czystej energii. Uwielbia bawić się swoimi ofiarami i manipulować ich emocjami, aby później pożreć ich esencję życiową."
  },
  {
    "id": 5,
    "typeId": 1,
    "name": "Brand",
    "desc": "Kiedyś członek plemienia lodowego Freljordu, imieniem Kegan Rodhe, istota znana jako Brand jest lekcją na temat pokus większej mocy."
  },
  {
    "id": 6,
    "typeId": 1,
    "name": "Caitlyn",
    "desc": "Znana jako najlepsza rozjemczyni, Caitlyn jest również najlepszą szansą Piltover na pozbycie się nieuchwytnych elementów kryminalnych z miasta. Często w parze z Vi, jest przystanią spokoju w porównaniu z żywiołowym charakterem jej partnerki."
  },
  {
    "id": 7,
    "typeId": 1,
    "name": "Jinx",
    "desc": "Jinx to maniakalna i porywcza kryminalistka z Zaun, która lubi siać zniszczenie bez przejmowania się konsekwencjami. Wyposażona w arsenał morderczych broni, wywołuje najgłośniejsze wybuchy i najjaśniejsze eksplozje, pozostawiając za sobą chaos i panikę."
  },
  {
    "id": 8,
    "typeId": 0,
    "name": "Seraphine",
    "desc": "Seraphine, urodzona w Piltover w zauńskiej rodzinie, słyszy dusze innych — świat śpiewa do niej, a ona mu odpowiada. Choć te dźwięki przytłaczały ją w młodości, teraz czerpie z nich inspirację, zamieniając chaos w symfonię."
  }
]"""
var rolesJson = """[
    {
    "id": 0,
    "type": "Supports"
    },
    {
      "id": 1,
      "type": "Assassins"
    }
  ]"""

val token = System.getenv("SLACK_TOKEN")
val slack = Slack.getInstance()
    var gson = Gson()
    val arrayChampionType = object : TypeToken<Array<Champion>>() {}.type
    val champions: Array<Champion> = gson.fromJson(championsJson, arrayChampionType)
//    champions.forEachIndexed  { idx, tut -> println("> Item ${idx}:\n${tut.name}") }

    val arrayRoleType = object : TypeToken<Array<Role>>() {}.type
    val roles: Array<Role> = gson.fromJson(rolesJson, arrayRoleType)
    var rolesList: String = "Roles: "
//    roles.forEachIndexed  { idx, tut -> println("> Item ${idx}:\n${tut.type}") }

fun Application.configureRouting(testing: Boolean = false) {
    roles.forEachIndexed  { idx, tut -> rolesList += "${tut.id}-${tut.type} " }

    routing {
//        homeRoute()

        get("/") {
            val response = slack.methods(token).chatPostMessage {
                it.channel("#general")
                    .text("Hello :wave:")
            }
            call.respondText("Response is: $response")
        }

        post("/rolelist") {

            call.respondText("$rolesList")
        }

        post("/champslist") {
            var typeId: Int = Integer.parseInt(call.receiveParameters()["text"])
            var filtered = champions.filter {  tut ->  tut.typeId == typeId }
            var championsList: String = (roles.find { tut -> tut.id == typeId }?.type ?: "") + ": "
            filtered.forEachIndexed  { idx, tut -> championsList += "${tut.id}-${tut.name}; " }

            call.respondText(championsList)
        }

        post("/champ") {
            var champId: Int = Integer.parseInt(call.receiveParameters()["text"])
            var champ = champions.find {  tut ->  tut.id == champId }

            if (champ != null) {
                call.respondText(champ.name + ": " + champ.desc)
            }
        }
    }

}
