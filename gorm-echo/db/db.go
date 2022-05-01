package db

import (
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/config"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	// "database/sql"
  // "gorm.io/driver/mysql"
  // "gorm.io/gorm"
)

var db *gorm.DB
var err error

func Init() {
	configuration := config.GetConfig()
	connect_string := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Local", configuration.DB_USERNAME, configuration.DB_PASSWORD, configuration.DB_NAME)

	// sqlDB, err := sql.Open("mysql", connect_string)
	// db, err = gorm.Open(mysql.New(mysql.Config{
	// 	Conn: sqlDB,
	// }), &gorm.Config{})

	db, err = gorm.Open("mysql", connect_string)
	// defer db.Close()
	if err != nil {
		panic("DB Connection Error")
	}

	db.AutoMigrate(&model.User{}, &model.Product{}, &model.Category{}, &model.Cart{}, &model.WishList{})
}

func DbManager() *gorm.DB {
	return db
}
