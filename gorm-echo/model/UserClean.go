package model

import (
	// "os"
	"fmt"

	jwt "github.com/dgrijalva/jwt-go"
)

type UserClean struct {
	ID					 uint
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
		"ID": u.ID,
		"Username": u.Username,
		"Email": u.Email,
	})

	tokenString, err := token.SignedString(jwtKey)
	u.Jwt = tokenString

	return tokenString, err
}

func (u *UserClean) VerifyToken() {
	if ( u.Jwt != "" ) {
		claims := jwt.MapClaims{}
		_, _ = jwt.ParseWithClaims(u.Jwt, claims, func(token *jwt.Token) (interface{}, error) {
			// since we only use the one private key to sign the tokens,
			// we also only use its public counter part to verify
			return jwtKey, nil
		})

		fmt.Println("claims", claims);

		u.ID = uint(claims["ID"].(float64))
	}

}