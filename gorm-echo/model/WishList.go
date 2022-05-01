package model

import (
  "github.com/jinzhu/gorm"
)

type WishList struct {
	gorm.Model
	ProductRefer	int
	Product				Product `gorm:"foreignKey:ProductRefer"`
	UserRefer 		int
	User					User `gorm:"foreignKey:UserRefer"`
}