package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"net/http"
	"fmt"

	"github.com/labstack/echo"
)

func GetUsers(c echo.Context) error {
	db := db.DbManager()
	users := []model.User{}
	
	if err := db.Find(&users).Error; err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}
	
	// spew.Dump(json.Marshal(users))
	// return c.JSON(http.StatusOK, users)
	return c.JSON(http.StatusOK, users)
}

func AddUser(c echo.Context) error {
	db := db.DbManager()
	
	user := new(model.User)
  if err := c.Bind(user); err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, user)
  }
	
	user.HashPassword()
	
	result := db.Create(&user)
	
	if result.Error != nil {
		fmt.Println(result.Error)
		return c.NoContent(http.StatusConflict)
	}
	
	fmt.Println(user.ID)  
	
  return c.JSON(http.StatusOK, user)
}

func DeteleUser(c echo.Context) error {
	db := db.DbManager()
	users := []model.User{}
	uid := c.Param("uid")
	
	response := db.Unscoped().Delete(&users, "id = ?", uid);

	if err := response.Error; err != nil {
		// panic(err)
		fmt.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}

	if response.RowsAffected == 0 {
		return c.NoContent(http.StatusNotFound)
	}
	
	// spew.Dump(json.Marshal(carts))
	// return c.JSON(http.StatusOK, carts)
	return c.NoContent(http.StatusOK)
}