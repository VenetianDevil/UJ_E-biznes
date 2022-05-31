package model

import (
	// "os"
	// "fmt"
	"github.com/jinzhu/gorm"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	id					 int
	Username     string	`gorm:"unique"`
	PasswordHash string
	Email				 string
	Access_token string
}

// HashPassword : Hash Password
func (u *User) HashPassword() {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(u.PasswordHash), bcrypt.DefaultCost)
	u.PasswordHash = string(bytes)
}
