package db

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"

	"github.com/jinzhu/gorm"
	// _ "github.com/jinzhu/gorm/dialects/mysql"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	// "database/sql"
  // "gorm.io/driver/mysql"
  // "gorm.io/gorm"
)

var db *gorm.DB
var err error

func Init() {
	
	db, err = gorm.Open("sqlite3", "db/database.db")

	if err != nil {
		panic(err)
		// panic("DB Connection Error")
	}

	db.AutoMigrate(&model.User{}, &model.Product{}, &model.Category{}, &model.Cart{}, &model.WishList{})

}

func DbManager() *gorm.DB {
	return db
}
