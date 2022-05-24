package model

import (
	// "os"
	// "fmt"

	jwt "github.com/dgrijalva/jwt-go"
)

type UserClean struct {
	id					 int
	Username     string
	Email				 string
	Jwt					 string
}

var (
	jwtKey = []byte("my-super-secret")
)

// GenerateToken : Generate Token
func (u *UserClean) GenerateToken() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": u.Username,
	})

	tokenString, err := token.SignedString(jwtKey)
	u.Jwt = tokenString

	return tokenString, err
}