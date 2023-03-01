<p align="center">
  <img src="https://www.buckaroo.nl/media/3577/magento2_hyva_icon.png" width="200px" position="center">
</p>

# Buckaroo Magento2 Hyvä checkout extension
Make payments on your Magento Hyvä SPA/PWA application using our plugin that integrates with the Hyvä checkout

### Index
- [Installation](#installation)
- [Supported Payment Methods](#supported-payment-methods)
- [Contribute](#contribute)
- [Versioning](#versioning)
- [Additional information](#additional-information)
---

### Installation

Before you start, please make sure that you've installed the following plugins in your Magento 2 environment:

- [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example)  or  [Hyvä Themes - React Checkout](https://github.com/hyva-themes/magento2-react-checkout)  codebase.
- [Buckaroo Magento 2 Extension](https://github.com/buckaroo-it/Magento2)
- [Buckaroo Magento 2 GraphQl Extension](https://github.com/buckaroo-it/Magento2_GraphQL)

**In reactapp/package.json of the Hyvä module, add this repository to the `paymentMethods` entry:**

```
"config": {
  "paymentMethodsRepo": {
    "buckaroo": "git@github.com:buckaroo-it/Magento2_Hyva.git"
  }
},
```

**Run `npm i` again to process the changes and `npm run build` to rebuild the app.**

In order to display the payment summary for partial payments using giftcards, you'll need copy (override) all the files & folders from: `Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo/src/lib/overrides` to `Hyva/CheckoutExample/reactapp/src`

### Upgrading

To update the plugin you just need to use git to fetch the latest changes from github, after that you build the react app again using npm

`cd Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo`

`git pull`

`cd Hyva/CheckoutExample/reactapp`

`npm run build`

### Internationalization

A csv file with the translation strings can be found in the `i18n` folder, you can use this file to add translation to the Hyvä module using the default internationalization functionality provided by Hyvä - [ Internationalization Docks](https://hyva-themes.github.io/magento2-react-checkout/i18n/)

---
### Supported Payment Methods
Currently not all payment methods are supported in our Magento 2 Hyvä checkout extension. A list of all supported payment methods can be found below:
- ApplePay
- AfterPay
- Bancontact
- Creditcards
- EPS
- Giftcards
- Giropay
- iDEAL
- KBC
- PayPal
- SEPA (Bank transfer)
- Payconiq
- Belfius
- Sofortbanking
- Alipay
- Wechatpay
- Trustly
- Rtp
- AfterpayOld
- Billink
- In3
- Klarna
- PayPerEmail
- SepaDirect
- Tinka
- Voucher

### Contribute
We really appreciate it when developers contribute to improve the Buckaroo plugins.
If you want to contribute as well, then please follow our [Contribution Guidelines](CONTRIBUTING.md).

### Versioning 
<p align="left">
  <img src="https://www.buckaroo.nl/media/3480/magento_versioning.png" width="500px" position="center">
</p>

- **MAJOR:** Breaking changes that require additional testing/caution.
- **MINOR:** Changes that should not have a big impact.
- **PATCHES:** Bug and hotfixes only.


### Additional information
- **Support:** https://support.buckaroo.eu/contact
- **Contact:** [support@buckaroo.nl](mailto:support@buckaroo.nl) or [+31 (0)30 711 50 50](tel:+310307115050)
