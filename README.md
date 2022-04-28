## Hyva-checkout-paymentmethod-buckaroo

### How to install?

- Before you start, make sure you've got a running installation of the [magento2-checkout-example](https://github.com/hyva-themes/magento2-checkout-example) or [magento2-react-checkout](https://github.com/hyva-themes/magento2-react-checkout) codebase.
- In reactapp/package.json, add this repository to the `paymentMethods` entry:
  ```
  "config": {
    "paymentMethodsRepo": {
      "buckaroo": "git@bitbucket.org:marissenpull/hyva-checkout-paymentmethod-buckaroo.git"
    }
  },
  ```
- Run `npm i` again to process the changes

- In order to display payment summary for partial payments using giftcards you need copy(override) all the files & folders from `Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo/src/lib/overrides` to `Hyva/CheckoutExample/reactapp/src` 
### Supported Payment Methods

- IDeal
- PayPal
- Creditcard