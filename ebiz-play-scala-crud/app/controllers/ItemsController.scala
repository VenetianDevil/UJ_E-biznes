package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import collection.mutable
import models.Item

case class NewItem(name: String)

@Singleton
class ItemsController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  private val items = new mutable.ListBuffer[Item]()
  items += Item(1, "Lampa")
  implicit val itemsJson = Json.format[Item]
  implicit val newItemsJson = Json.format[NewItem]

  def getAll(): Action[AnyContent] = Action {
    if (items.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(items))
    }
  }

  def getById(id: Long): Action[AnyContent] = Action {
    val foundItem = items.find(_.id == id)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None       => NotFound
    }
  }

  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val item: Option[NewItem] =
      jsonObject.flatMap(
        Json.fromJson[NewItem](_).asOpt
      )

    item match {
      case Some(newItem) =>
        val oldItem = items.find(_.id == id)
        oldItem match {
          case Some(toDeleteItem) =>
            val toBeAdded = Item(toDeleteItem.id, newItem.name)
            items -= toDeleteItem
            items += toBeAdded
            Ok(Json.toJson(toBeAdded))
          case None => NotFound
        }
      case None =>
        BadRequest
    }
  }

  def delete(id: Long): Action[AnyContent] = Action {
    val foundItem = items.find(_.id == id)
    foundItem match {
      case Some(item) => {
        items -= item
        Ok(Json.toJson(item))
      }
      case None => NotFound
    }
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val item: Option[NewItem] =
      jsonObject.flatMap(
        Json.fromJson[NewItem](_).asOpt
      )

    item match {
      case Some(newItem) =>
        val nextId = items.map(_.id).max + 1
        val toBeAdded = Item(nextId, newItem.name)
        items += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
