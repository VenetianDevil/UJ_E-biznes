package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import collection.mutable
import models.Opinion

case class NewOpinion(userId: Long, itemId: Long, text: String)

@Singleton
class OpinionsController @Inject() (
    val controllerComponents: ControllerComponents
) extends BaseController {

  private val opinions = new mutable.ListBuffer[Opinion]()
  opinions += Opinion(1, 1, 1, "Ta Lampa jest super")
  implicit val opinionsJson = Json.format[Opinion]
  implicit val newOpinionsJson = Json.format[NewOpinion]

  def getAll(): Action[AnyContent] = Action {
    if (opinions.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(opinions))
    }
  }

  def getById(id: Long): Action[AnyContent] = Action {
    val foundOpinion = opinions.find(_.id == id)
    foundOpinion match {
      case Some(opinion) => Ok(Json.toJson(opinion))
      case None          => NotFound
    }
  }

  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val opinion: Option[NewOpinion] =
      jsonObject.flatMap(
        Json.fromJson[NewOpinion](_).asOpt
      )

    opinion match {
      case Some(newOpinion) =>
        val oldOpinion = opinions.find(_.id == id)
        oldOpinion match {
          case Some(toDeleteOpinion) =>
            val toBeAdded = Opinion(toDeleteOpinion.id, newOpinion.userId, newOpinion.itemId, newOpinion.text)
            opinions -= toDeleteOpinion
            opinions += toBeAdded
            Ok(Json.toJson(toBeAdded))
          case None => NotFound
        }
      case None =>
        BadRequest
    }
  }

  def delete(id: Long): Action[AnyContent] = Action {
    val foundOpinion = opinions.find(_.id == id)
    foundOpinion match {
      case Some(opinion) => {
        opinions -= opinion
        Ok(Json.toJson(opinion))
      }
      case None => NotFound
    }
  }

  def deleteByItem(itemId: Long) = {
    opinions.filter(_.itemId == itemId)
  }
  
  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val opinion: Option[NewOpinion] =
      jsonObject.flatMap(
        Json.fromJson[NewOpinion](_).asOpt
      )

    opinion match {
      case Some(newOpinion) =>
        val nextId = opinions.map(_.id).max + 1
        val toBeAdded = Opinion(nextId, newOpinion.userId, newOpinion.itemId, newOpinion.text)
        opinions += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
