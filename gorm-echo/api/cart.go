package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"net/http"
	"fmt"

	"github.com/labstack/echo"
)

func GetCart(c echo.Context) error {
	db := db.DbManager()
	carts := []model.Cart{}
	uid := c.Param("uid")
	
	if err := db.Find(&carts, "user_id = ?", uid).Error; err != nil {
		panic(err)
	}

	for i := 0; i < len(carts); i++ {
		db.Preload("User").Find(&carts[i])
		db.Preload("Product").Find(&carts[i])
		db.Preload("Category").Find(&carts[i].Product)
	}
	
	// spew.Dump(json.Marshal(carts))
	// return c.JSON(http.StatusOK, carts)
	return c.JSON(http.StatusOK, carts)
}

func AddProdToCart(c echo.Context) error {
	fmt.Println("addCart")
	db := db.DbManager()
	
	cart := new(model.Cart)
  if err := c.Bind(cart); err != nil {
		panic(err)
		// return nil
  }
	
	product := new(model.Product)
	if err := db.First(&product, cart.ProductID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	user := new(model.User)
	if err := db.First(&user, cart.UserID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	result := db.Create(&cart)
	db.Preload("User").Find(&cart)
	db.Preload("Product").Find(&cart)
	db.Preload("Category").Find(&cart.Product)
	
	if result.Error != nil {
		panic(result.Error)
		// return nil
	}

	fmt.Println(cart.ID)  

  return c.JSON(http.StatusOK, cart)
}