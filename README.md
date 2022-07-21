## Buckaroo Magento 2 Hyvä checkout

### Installation & Configuration 

- Before you start, make sure you've got a running installation of the following plugins:

  - [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example) or [Hyvä Themes - React Checkout](https://github.com/hyva-themes/magento2-react-checkout) codebase.

  - [Buckaroo Magento 2 Extension](https://github.com/buckaroo-it/Magento2) 
  - [Buckaroo Magento 2 GraphQl Extension](https://github.com/buckaroo-it/Magento2_GraphQL) 
- In reactapp/package.json of the Hyvä module, add this repository to the `paymentMethods` entry:
  ```
  "config": {
    "paymentMethodsRepo": {
      "buckaroo": "git@github.com:buckaroo-it/Magento2_Hyva.git"
    }
  },
  ```
- Run `npm i` again to process the changes

- In order to display payment summary for partial payments using giftcards you need copy(override) all the files & folders from `Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo/src/lib/overrides` to `Hyva/CheckoutExample/reactapp/src` 
### Supported Payment Methods

- ApplePay
- Afterpay
- Bancontact
- Creditcard
- Eps
- Giropay
- IDeal
- PayPal
- SepaTransfer
