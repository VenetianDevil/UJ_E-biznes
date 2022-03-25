package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import collection.mutable
import models.User

case class NewUser(username: String)

@Singleton
class UsersController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  private val users = new mutable.ListBuffer[User]()
  users += User(1, "Kasia")
  implicit val usersJson = Json.format[User]
  implicit val newUsersJson = Json.format[NewUser]

  def getAll(): Action[AnyContent] = Action {
    if (users.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(users))
    }
  }

  def getById(id: Long): Action[AnyContent] = Action {
    val foundUser = users.find(_.id == id)
    foundUser match {
      case Some(user) => Ok(Json.toJson(user))
      case None       => NotFound
    }
  }

  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val user: Option[NewUser] =
      jsonObject.flatMap(
        Json.fromJson[NewUser](_).asOpt
      )

    user match {
      case Some(newUser) =>
        val oldUser = users.find(_.id == id)
        oldUser match {
          case Some(toDeleteUser) =>
            val toBeAdded = User(toDeleteUser.id, newUser.username)
            users -= toDeleteUser
            users += toBeAdded
            Ok(Json.toJson(toBeAdded))
          case None => NotFound
        }
      case None =>
        BadRequest
    }
  }

  def delete(id: Long): Action[AnyContent] = Action {
    val foundUser = users.find(_.id == id)
    foundUser match {
      case Some(user) => {
        users -= user
        Ok(Json.toJson(user))
      }
      case None => NotFound
    }
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val user: Option[NewUser] =
      jsonObject.flatMap(
        Json.fromJson[NewUser](_).asOpt
      )

    user match {
      case Some(newUser) =>
        val nextId = users.map(_.id).max + 1
        val toBeAdded = User(nextId, newUser.username)
        users += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
