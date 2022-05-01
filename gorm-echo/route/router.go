package route

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/api"

	"github.com/labstack/echo"
)

func Init() *echo.Echo {
	e := echo.New()

	e.GET("/", api.Home)

	e.GET("/users", api.GetUsers)
	e.POST("/users", api.AddUser)

	e.GET("/products", api.GetProducts)
	e.POST("/products", api.AddProduct)

	e.GET("/categories", api.GetCategories)
	e.POST("/categories", api.AddCategory)

	return e
}
