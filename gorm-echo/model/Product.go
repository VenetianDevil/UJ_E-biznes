package model

import (
  "gorm.io/gorm"
)

type Product struct {
	gorm.Model
	id						uint64		`gorm:"primary_key"`
	Name     			string
	Description 	string
	Price  				float64		`gorm:"type:decimal(10,2)"`
	CategoryID		uint64
	Category			Category
}
