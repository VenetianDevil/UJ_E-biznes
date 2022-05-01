package model

import (
  "github.com/jinzhu/gorm"
)

type Cart struct {
	gorm.Model
	ProductID			int
	Product				Product
	UserID 				int
	User					User
}
