package main

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/route"
)

func main() {
	db.Init()
	e := route.Init()

	e.Logger.Fatal(e.Start(":1323"))
}
