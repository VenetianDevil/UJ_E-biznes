package api

import (
	"strconv"
	"net/http"
	"github.com/labstack/echo"

	stripe "github.com/stripe/stripe-go/v72"
	paymentintent "github.com/stripe/stripe-go/v72/paymentintent"
)

type CheckoutData struct {
	ClientSecret string `json:"client_secret"`
}

func GetClientSecret(c echo.Context) error {
	stripe.Key = "sk_test_51LBMlnHPJpcoxKcTqNM9yLPuRP1bUVcY1tU4pCT0iylcnbMASu5yYDAHO6HpT1inRDYA09htTZQce0VJWOSwtT3M00LmVkO7rC"
	amount, _ := strconv.ParseInt(c.Param("amount"), 10, 64)
	params := &stripe.PaymentIntentParams{
		Amount: stripe.Int64(amount),
		Currency: stripe.String(string(stripe.CurrencyPLN)),
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
	}
	intent, _ := paymentintent.New(params)
  // intent := // ... Fetch or create the PaymentIntent

  data := CheckoutData {
    ClientSecret: intent.ClientSecret,
  }

	return c.JSON(http.StatusOK, data)

}