package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"net/http"
	"fmt"

	"github.com/labstack/echo"
)

func GetProducts(c echo.Context) error {
	db := db.DbManager()
	products := []model.Product{}
	
	if err := db.Find(&products).Error; err != nil {
		panic(err)
	}

	for i := 0; i < len(products); i++ {
		db.Preload("Category").Find(&products[i])
	}
	
	// spew.Dump(json.Marshal(products))
	// return c.JSON(http.StatusOK, products)
	return c.JSON(http.StatusOK, products)
}

func AddProduct(c echo.Context) error {
	fmt.Println("addProduct")
	db := db.DbManager()
	
	product := new(model.Product)
  if err := c.Bind(product); err != nil {
		panic(err)
		// return nil
  }
	
	category := new(model.Category)
	if err := db.First(&category, product.CategoryID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	result := db.Create(&product)
	db.Preload("Category").Find(&product)
	
	if result.Error != nil {
		panic(result.Error)
		// return nil
	}

	fmt.Println(product.ID)  

  return c.JSON(http.StatusOK, product)
}