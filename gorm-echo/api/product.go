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
		fmt.Println(err)
		return c.NoContent(http.StatusNotFound)
	}
	
	for i := 0; i < len(products); i++ {
		db.Preload("Category").Find(&products[i])
	}
	
	return c.JSON(http.StatusOK, products)
}

func AddProduct(c echo.Context) error {
	fmt.Println("addProduct")
	db := db.DbManager()
	
	product := new(model.Product)
  if err := c.Bind(product); err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusNotFound)
  }
	
	category := new(model.Category)
	if err := db.First(&category, product.CategoryID).Error; err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusBadRequest)
	}

	result := db.Create(&product)
	
	if result.Error != nil {
		fmt.Println(result.Error)
		return c.NoContent(http.StatusInternalServerError)
	}
	
	db.Preload("Category").Find(&product)
	fmt.Println(product.ID)  

  return c.JSON(http.StatusOK, product)
}

func DeteleProduct(c echo.Context) error {
	db := db.DbManager()
	pid := c.Param("pid")

	response := db.Unscoped().Delete(&model.Product{}, pid);
	
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