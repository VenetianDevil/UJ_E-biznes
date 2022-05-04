package route

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/api"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func Init() *echo.Echo {
	e := echo.New()

 //CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.GET("/", api.Home)

	e.GET("/users", api.GetUsers)
	e.POST("/users", api.AddUser)

	e.GET("/products", api.GetProducts)
	e.POST("/products", api.AddProduct)

	e.GET("/categories", api.GetCategories)
	e.POST("/categories", api.AddCategory)

	e.GET("/cart/:uid", api.GetCart)
	e.POST("/cart", api.AddProdToCart)

	e.GET("/wishlist/:uid", api.GetWishList)
	e.POST("/wishlist", api.AddProdToWishList)

	return e
}
