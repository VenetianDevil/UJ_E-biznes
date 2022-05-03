package model

import (
  "github.com/jinzhu/gorm"
)

type WishList struct {
	gorm.Model
	ProductID			int
	Product				Product
	UserID 				int
	User					User
}