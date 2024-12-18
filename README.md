<p align="center">
  <img src="https://www.buckaroo.nl/media/iyvnqp2k/magento2_hyvareactcheckout_icon.png" width="200px" position="center">
</p>

# Buckaroo Magento2 Hyvä checkout extension
Make payments on your Magento Hyvä SPA/PWA application using the Buckaroo plugin that integrates with the Hyvä checkout.

### Index
- [Installation](#installation)
- [Upgrade](#upgrade)
- [Internationalization](#internationalization)
- [Supported Payment Methods](#supported-payment-methods)
- [Contribute](#contribute)
- [Versioning](#versioning)
- [Additional information](#additional-information)
---

### Installation

Before you start, please make sure that you've installed the following plugins in your Magento 2 environment:

- [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example)  or  [Hyvä Themes - React Checkout](https://github.com/hyva-themes/magento2-react-checkout)  codebase.
- [Buckaroo Magento 2 Extension](https://github.com/buckaroo-it/Magento2)
- [Buckaroo Magento 2 GraphQL Extension](https://github.com/buckaroo-it/Magento2_GraphQL)

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

### Upgrade

To update the plugin you just need to use git to fetch the latest changes from GitHub, after that you build the react app again using npm

`cd Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo`

`git pull`

`cd Hyva/CheckoutExample/reactapp`

`npm run build`

### Internationalization
A csv file with the translation strings can be found in the `i18n` folder, you can use this file to add translation to the Hyvä module using the default internationalization functionality provided by Hyvä - [ Internationalization Docs](https://hyva-themes.github.io/magento2-react-checkout/i18n/).

---
### Supported Payment Methods
Currently not all payment methods are supported in our Magento 2 Hyvä checkout extension. A list of all supported payment methods can be found below:
- [Alipay](https://docs.buckaroo.io/docs/alipay-1)
- [Apple Pay](https://docs.buckaroo.io//docs/apple-pay)
- [Bancontact](https://docs.buckaroo.io//docs/bancontact)
- [Belfius](https://docs.buckaroo.io/docs/belfius)
- [Billink](https://docs.buckaroo.io/docs/billink)
- [Creditcards](https://docs.buckaroo.io/docs/creditcards)
- [EPS](https://docs.buckaroo.io/docs/eps)
- [Giftcards](https://docs.buckaroo.io/docs/giftcards)
- [Giropay](https://docs.buckaroo.io/docs/giropay)
- [iDEAL](https://docs.buckaroo.io/docs/ideal)
- [In3](https://docs.buckaroo.io/docs/in3)
- [KBC](https://docs.buckaroo.io/docs/kbc)
- [Klarna](https://docs.buckaroo.io/docs/klarna)
- [Payconiq](https://docs.buckaroo.io/docs/payconiq)
- [PayPal](https://docs.buckaroo.io/docs/paypal)
- [PayPerEmail](https://docs.buckaroo.io/docs/payperemail)
- [Riverty / AfterPay](https://docs.buckaroo.io/docs/afterpay)
- [Riverty / AfterPay (old)](https://docs.buckaroo.io/docs/afterpay-old-integration)
- [SEPA Credit transfer (Bank transfer)](https://docs.buckaroo.io/docs/transfer)
- [SEPA Direct Debit](https://docs.buckaroo.io/docs/sepa-direct-debit)
- [Sofort](https://docs.buckaroo.io/docs/sofort)
- [Tinka](https://docs.buckaroo.io/docs/tinka)
- [Trustly](https://docs.buckaroo.io/docs/trustly)
- [Buckaroo Voucher](https://docs.buckaroo.io/docs/buckaroo-voucher)
- [WeChatPay](https://docs.buckaroo.io/docs/wechatpay)

### Contribute
We really appreciate it when developers contribute to improve the Buckaroo plugins.
If you want to contribute as well, then please follow our [Contribution Guidelines](CONTRIBUTING.md).

> ### Community is the :green_heart: of open source
> Developing beautiful products is not possible without the input of a community. We thank everyone who actively contributes to this.
> 
> [![ennostuurman's avatar](https://github.com/ennostuurman.png?size=50)](https://github.com/ennostuurman) [![rajeev-k-tomy's avatar](https://github.com/rajeev-k-tomy.png?size=50)](https://github.com/rajeev-k-tomy) [![poespas's avatar](https://github.com/poespas.png?size=50)](https://github.com/poespas) [![marissennet's avatar](https://github.com/marissennet.png?size=50)](https://github.com/marissennet) ![mgroensmit's avatar](https://avatars.githubusercontent.com/u/63691247?s=50)

We would like to extend a special thank you to the developers at [Mooore](https://www.mooore.nl/) who have been co-developing with us on this project and were the initiators of this collaboration. Your hard work, dedication, and expertise have been invaluable in bringing this project to life. We couldn't have done it without you. Thank you! :raised_hands:

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

