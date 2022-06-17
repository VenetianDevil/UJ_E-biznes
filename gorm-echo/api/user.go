package api

import (
	// "encoding/json"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/db"
	"github.com/VenetianDevil/UJ_E-biznes/gorm-echo/model"

	"net/http"
	"fmt"
	"os"
	"io/ioutil"
	"encoding/json"
	"time"
	"strings"
	"strconv"

	"github.com/labstack/echo"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/github"
)

func authorizeUser(c echo.Context) error {
	header := c.Request().Header
	authv := header.Get("Authorization")
	uid, _ := strconv.ParseUint(c.Param("uid"), 10, 32)

	// Get bearer token
	if !strings.HasPrefix(strings.ToLower(authv), "bearer") {
		return c.NoContent(http.StatusUnauthorized)
	}

	values := strings.Split(authv, " ")
	if len(values) < 2 {
		return c.NoContent(http.StatusUnauthorized)
	}

	token := values[1]
	user := model.UserClean{}
	user.Jwt = token
	user.VerifyToken()

	if (uint(uid) == user.ID) {
		return nil
	}

	return c.NoContent(http.StatusUnauthorized)
}

func GetUsers(c echo.Context) error {
	db := db.DbManager()
	users := []model.User{}
	
	if err := db.Find(&users).Error; err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}
	
	// spew.Dump(json.Marshal(users))
	// return c.JSON(http.StatusOK, users)
	return c.JSON(http.StatusOK, users)
}

func AddUser(c echo.Context) error {
	db := db.DbManager()
	
	user := new(model.User)
  if err := c.Bind(user); err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, user)
  }
	
	user.HashPassword()
	
	result := db.Create(&user)
	
	if result.Error != nil {
		fmt.Println(result.Error)
		return c.NoContent(http.StatusConflict)
	}
	
	fmt.Println(user.ID)  
	
  return c.JSON(http.StatusOK, user)
}

func DeteleUser(c echo.Context) error {
	db := db.DbManager()
	users := []model.User{}
	uid := c.Param("uid")
	
	response := db.Unscoped().Delete(&users, "id = ?", uid);

	if err := response.Error; err != nil {
		// panic(err)
		fmt.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}

	if response.RowsAffected == 0 {
		return c.NoContent(http.StatusNotFound)
	}
	
	// spew.Dump(json.Marshal(carts))
	// return c.JSON(http.StatusOK, carts)
	return c.NoContent(http.StatusOK)
}

// -------------------------- OAuth2 ------------------------

var (
	googleOauthConfig *oauth2.Config
	githubOauthConfig *oauth2.Config
	oauthStateString = "pseudo-random"
)

func OauthConfigInit() {
	os.Setenv("GOOGLE_CLIENT_ID", "99738054409-7ue2pmfbof68tp8b6behqdbpqbu7egb7.apps.googleusercontent.com")
	os.Setenv("GOOGLE_CLIENT_SECRET", "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")
	os.Setenv("GITHUB_CLIENT_ID", "860d09180e50a0ee1578")
	os.Setenv("GITHUB_CLIENT_SECRET", "ecdb5f4a97c29c5961ea13688df43bfb39ba4cbb")

	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:1323/auth/callback/google",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	githubOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:1323/auth/callback/github",
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Scopes:       []string{"https://github.com/login/oauth/access_token"},
		Endpoint:     github.Endpoint,
	}
}

func HandleGoogleLogin(c echo.Context) error {
	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGoogleCallback(c echo.Context) error {
	fmt.Println("context", c.FormValue("state"), c.FormValue("code"))
	contents, err := getUserInfoGoogle(c.FormValue("state"), c.FormValue("code"))
	
	if err != nil {
		fmt.Println(err.Error())
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/");
	}
	
	userinfo := new(model.User)
	json.Unmarshal([]byte(string(contents)), &userinfo)

	dbUser, err := doesUserAlreadyExist(userinfo.Email)
	if err != nil {
		fmt.Println(err.Error())
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/");
	}

	user := model.UserClean{ID: dbUser.ID, Username: userinfo.Email, Email: userinfo.Email}
	user.GenerateToken()
	
	userStr, err := json.Marshal(user)

	cookieUser := new(http.Cookie)
	cookieUser.Path = "/logged"
	cookieUser.Name = "user"
	cookieUser.Value = string(userStr)
	cookieUser.Expires = time.Now().Add(30*time.Second)
	cookieUser.HttpOnly = false
	cookieUser.Secure = true
	c.SetCookie(cookieUser)
	
	return c.Redirect(http.StatusSeeOther, "http://localhost:3000/logged?token="+user.Jwt);
}

func HandleGithubLogin(c echo.Context) error {
	url := githubOauthConfig.AuthCodeURL(oauthStateString)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGithubCallback(c echo.Context) error {
	// fmt.Println("context", c.FormValue("state"), c.FormValue("code"))
	contents, err := getUserInfoGithub(c.FormValue("state"), c.FormValue("code"))
	
	if err != nil {
		fmt.Println(err.Error())
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/");
	}
	
	userinfo := new(model.UserGithub)
	json.Unmarshal([]byte(string(contents)), &userinfo)
	
	dbUser, err := doesUserAlreadyExist(userinfo.Login)
	if err != nil {
		fmt.Println(err.Error())
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/");
	}

	user := model.UserClean{ID: dbUser.ID, Username: userinfo.Login, Email: userinfo.Email}
	user.GenerateToken()
	
	userStr, err := json.Marshal(user)

	cookieUser := new(http.Cookie)
	cookieUser.Path = "/logged"
	cookieUser.Name = "user"
	cookieUser.Value = string(userStr)
	cookieUser.Expires = time.Now().Add(30*time.Second)
	cookieUser.HttpOnly = false
	cookieUser.Secure = true
	c.SetCookie(cookieUser)
	
	return c.Redirect(http.StatusSeeOther, "http://localhost:3000/logged?token="+user.Jwt)
}

func getUserInfoGoogle(state string, code string) ([]byte, error) {
	if state != oauthStateString {
		return nil, fmt.Errorf("invalid oauth state")
	}
	token, err := googleOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		return nil, fmt.Errorf("code exchange failed: %s", err.Error())
	}
	
	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)

	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading response body: %s", err.Error())
	}

	userinfo := new(model.User)
	json.Unmarshal([]byte(string(contents)), &userinfo)
	_, err = doesUserAlreadyExist(userinfo.Email)
	if err != nil {
	
		user := model.User{ Username: userinfo.Email, Email: userinfo.Email, Access_token: token.AccessToken	}
		db := db.DbManager()
		db.Create(&user)
	}
	
	return contents, nil
}

func getUserInfoGithub(state string, code string) ([]byte, error) {
	if state != oauthStateString {
		return nil, fmt.Errorf("invalid oauth state")
	}

	token, err := githubOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		return nil, fmt.Errorf("code exchange failed: %s", err.Error())
	}

	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	req.Header.Set("Authorization", "token " + token.AccessToken)
	response, err := client.Do(req)

	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading response body: %s", err.Error())
	}
	
	userinfo := new(model.UserGithub)
	json.Unmarshal([]byte(string(contents)), &userinfo)
	_, err = doesUserAlreadyExist(userinfo.Login)
	if err != nil {
	
		user := model.User{ Username: userinfo.Login, Email: userinfo.Email, Access_token: token.AccessToken}
		db := db.DbManager()
		db.Create(&user)
	}

	return contents, nil
}

func doesUserAlreadyExist(username string) (*model.User, error) {
	db := db.DbManager()
	dbUser := model.User{}
	if err := db.Find(&dbUser, "Username=?", username).Error; err != nil {
		return nil, err
	}
	
	return &dbUser, nil
}