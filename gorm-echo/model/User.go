package model

import (
	// "os"
	"fmt"
	"github.com/jinzhu/gorm"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	id					 uint
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

func (u *User) CompareHashedPassword(passDb string) error {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(passDb))
	if err != nil {
		fmt.Println(err)
		return err
	}
	
	fmt.Println("comparing: OK")
	return nil
}