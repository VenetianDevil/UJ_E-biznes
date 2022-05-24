package model

import (
	"github.com/jinzhu/gorm"

)

type UserGithub struct {
	gorm.Model
	Login     string	`gorm:"unique"`
	Email			string
}
