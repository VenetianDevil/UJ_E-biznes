package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"net/http"
	"fmt"

	"github.com/labstack/echo"
)

func GetWishList(c echo.Context) error {
	db := db.DbManager()
	withlists := []model.WishList{}
	uid := c.Param("uid")
	
	if err := db.Find(&withlists, "user_id = ?", uid).Error; err != nil {
		panic(err)
	}

	for i := 0; i < len(withlists); i++ {
		db.Preload("User").Find(&withlists[i])
		db.Preload("Product").Find(&withlists[i])
		db.Preload("Category").Find(&withlists[i].Product)
	}
	
	// spew.Dump(json.Marshal(withlists))
	// return c.JSON(http.StatusOK, withlists)
	return c.JSON(http.StatusOK, withlists)
}

func AddProdToWishList(c echo.Context) error {
	fmt.Println("addWishList")
	db := db.DbManager()
	
	wishlist := new(model.WishList)
  if err := c.Bind(wishlist); err != nil {
		panic(err)
		// return nil
  }
	
	product := new(model.Product)
	if err := db.First(&product, wishlist.ProductID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	user := new(model.User)
	if err := db.First(&user, wishlist.UserID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	result := db.Create(&wishlist)
	db.Preload("User").Find(&wishlist)
	db.Preload("Product").Find(&wishlist)
	db.Preload("Category").Find(&wishlist.Product)
	
	if result.Error != nil {
		panic(result.Error)
		// return nil
	}

	fmt.Println(wishlist.ID)  

  return c.JSON(http.StatusOK, wishlist)
}

func CleanWishlist(c echo.Context) error {
	db := db.DbManager()
	wishlists := []model.WishList{}
	uid := c.Param("uid")
	
	if err := db.Unscoped().Delete(&wishlists, "user_id = ?", uid).Error; err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, wishlists)
	}
	
	// spew.Dump(json.Marshal(wishlist))
	// return c.JSON(http.StatusOK, wishlist)
	return c.JSON(http.StatusOK, wishlists)
}