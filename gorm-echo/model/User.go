package model

import (
	"os"
	"github.com/jinzhu/gorm"

	"golang.org/x/crypto/bcrypt"
	jwt "github.com/dgrijalva/jwt-go"
)

type User struct {
	gorm.Model
	id					 int
	Username     string	`gorm:"unique"`
	PasswordHash string
}

var (
	jwtKey = os.Getenv("JWT_KEY")
)

// HashPassword : Hash Password
func (u *User) HashPassword() {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(u.PasswordHash), bcrypt.DefaultCost)
	u.PasswordHash = string(bytes)
}

// GenerateToken : Generate Token
func (u *User) GenerateToken() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": u.Username,
	})

	tokenString, err := token.SignedString(jwtKey)
	return tokenString, err
}