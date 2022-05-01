package model

import (
  "gorm.io/gorm"
)

type Category struct {
	gorm.Model
	id			uint64	`gorm:"primary_key"`
	Name		string	`gorm:"unique"`
}
