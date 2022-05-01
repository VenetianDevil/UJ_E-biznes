package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"net/http"
	"fmt"

	"github.com/labstack/echo"
)

func GetCategories(c echo.Context) error {
	db := db.DbManager()
	categories := []model.Category{}
	
	if err := db.Find(&categories).Error; err != nil {
		panic(err)
	}
	
	// spew.Dump(json.Marshal(categories))
	// return c.JSON(http.StatusOK, categories)
	return c.JSON(http.StatusOK, categories)
}

func AddCategory(c echo.Context) error {
	db := db.DbManager()
	
	category := new(model.Category)
  if err := c.Bind(category); err != nil {
		return nil
  }

	result := db.Create(&category)

	if result.Error != nil {
		return nil
	}

	fmt.Println(category.ID)  

  return c.JSON(http.StatusOK, category)
}