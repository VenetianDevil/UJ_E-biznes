package route

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/api"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func Init() *echo.Echo {
	e := echo.New()
	api.OauthConfigInit()

 //CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.GET("/", api.Home)

	e.GET("/users", api.GetUsers)
	e.POST("/users", api.AddUser)
	e.DELETE("/users/:uid", api.DeteleUser)

	e.GET("/products", api.GetProducts)
	e.POST("/products", api.AddProduct)
	e.DELETE("/products/:pid", api.DeteleProduct)

	e.GET("/categories", api.GetCategories)
	e.POST("/categories", api.AddCategory)
	e.DELETE("/categories/:cid", api.DeleteCategory)

	e.GET("/cart/:uid", api.GetCart)
	e.POST("/cart", api.AddProdToCart)
	
	e.POST("/payment/:uid", api.OrderAndPay)

	e.GET("/wishlist/:uid", api.GetWishList)
	e.POST("/wishlist", api.AddProdToWishList)
	e.DELETE("/wishlist/:uid", api.CleanWishlist)

	e.GET("/auth/login/google", api.HandleGoogleLogin)
	e.GET("/auth/callback/google", api.HandleGoogleCallback)
	e.GET("/auth/login/github", api.HandleGithubLogin)
	e.GET("/auth/callback/github", api.HandleGithubCallback)

	return e
}
