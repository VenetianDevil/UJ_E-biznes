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
		panic(err)
	}
	
	// spew.Dump(json.Marshal(users))
	// return c.JSON(http.StatusOK, users)
	return c.JSON(http.StatusOK, users)
}

func AddUser(c echo.Context) error {
	db := db.DbManager()
	
	user := new(model.User)
  if err := c.Bind(user); err != nil {
		return nil
  }

	user.HashPassword()

	result := db.Create(&user)

	if result.Error != nil {
		return nil
	}

	fmt.Println(user.ID)  

  return c.JSON(http.StatusOK, user)
}