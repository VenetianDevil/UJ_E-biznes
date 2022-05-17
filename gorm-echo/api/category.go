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
		fmt.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}
	
	// spew.Dump(json.Marshal(categories))
	// return c.JSON(http.StatusOK, categories)
	return c.JSON(http.StatusOK, categories)
}

func AddCategory(c echo.Context) error {
	db := db.DbManager()
	
	category := new(model.Category)
  if err := c.Bind(category); err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusBadRequest)
  }

	result := db.Create(&category)

	if result.Error != nil {
		fmt.Println(result.Error)
		return c.NoContent(http.StatusConflict)
	}

	fmt.Println(category.ID)  

  return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context) error {
	db := db.DbManager()
	categories := []model.Category{}
	cid := c.Param("cid")

	response := db.Unscoped().Delete(&categories, "id = ?", cid)

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