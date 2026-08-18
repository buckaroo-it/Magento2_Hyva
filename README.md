<p align="center">
  <a href="https://www.buckaroo.nl">
    <img src="https://raw.githubusercontent.com/buckaroo-it/Media/main/Buckaroo/README.md%20Headers/buckaroo-magento2-hyva-react-checkout-header-rounded.png" alt="Buckaroo — Hyvä React Checkout for Magento 2" width="100%">
  </a>
</p>

<h1 align="center">Buckaroo Hyvä React Checkout module for Magento 2</h1>

<p align="center">
  <a href="https://docs.buckaroo.io/docs/magento-2-new-additional-modules-hyva-react-checkout-module"><img src="https://img.shields.io/badge/docs-docs.buckaroo.io-1a1a4b.svg" alt="Documentation"></a>
  <a href="https://github.com/buckaroo-it/Magento2"><img src="https://img.shields.io/badge/requires-Buckaroo%20Magento%202-1a1a4b.svg" alt="Requires the Buckaroo Magento 2 plugin"></a>
  <a href="https://github.com/buckaroo-it/Magento2_GraphQL"><img src="https://img.shields.io/badge/requires-Buckaroo%20GraphQL-1a1a4b.svg" alt="Requires the Buckaroo GraphQL module"></a>
</p>

<p align="center">
  <a href="#about">About</a> &middot;
  <a href="#requirements">Requirements</a> &middot;
  <a href="#installation">Installation</a> &middot;
  <a href="#upgrade">Upgrade</a> &middot;
  <a href="#payment-methods">Payment methods</a> &middot;
  <a href="#internationalization">Internationalization</a> &middot;
  <a href="#support">Support</a> &middot;
  <a href="#contribute">Contribute</a>
</p>

---

## About

This module adds Buckaroo payment support to the [Hyvä](https://www.hyva.io/) React Checkout, so customers can pay on a Magento SPA or PWA storefront.

It is an extension of the [Buckaroo Magento 2 plugin](https://github.com/buckaroo-it/Magento2), not a replacement for it. The main plugin handles the payments, the [GraphQL module](https://github.com/buckaroo-it/Magento2_GraphQL) exposes them to the headless frontend, and this module renders them in the React checkout.

> [!IMPORTANT]
> There are two Hyvä checkout products, and they need different modules. This repository is for **Hyvä React Checkout**. If you use **Hyvä Checkout**, install [Magento2_Hyva_Checkout](https://github.com/buckaroo-it/Magento2_Hyva_Checkout) instead.

Unlike the other Buckaroo modules, this one is not a Composer package. It is a payment method package for the React app, added through npm.

[Full module documentation on docs.buckaroo.io](https://docs.buckaroo.io/docs/magento-2-new-additional-modules-hyva-react-checkout-module)

---

## Requirements

Install and configure the following in your Magento 2 environment before you start:

| Requirement | Notes |
|---|---|
| [Hyvä Checkout Example Module Template](https://github.com/hyva-themes/magento2-checkout-example) or [Hyvä React Checkout](https://github.com/hyva-themes/magento2-react-checkout) | The React checkout codebase this module plugs into |
| [Buckaroo Magento 2 plugin](https://github.com/buckaroo-it/Magento2) | Handles the payments |
| [Buckaroo GraphQL module](https://github.com/buckaroo-it/Magento2_GraphQL) | Exposes the payment methods to the headless frontend |

You also need a Buckaroo account. Don't have one yet? [Request an account](https://www.buckaroo.nl/start).

---

## Installation

Add this repository to the `paymentMethodsRepo` entry in the `reactapp/package.json` of your Hyvä module:

```json
"config": {
  "paymentMethodsRepo": {
    "buckaroo": "git@github.com:buckaroo-it/Magento2_Hyva.git"
  }
},
```

Then process the change and rebuild the app:

```bash
npm i
npm run build
```

<details>
<summary>Showing the payment summary for partial giftcard payments</summary>

To display the payment summary when part of an order is paid with a giftcard, copy (override) all files and folders from:

```
Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo/src/lib/overrides
```

to:

```
Hyva/CheckoutExample/reactapp/src
```

</details>

---

## Upgrade

Fetch the latest changes with git, then rebuild the React app:

```bash
cd Hyva/CheckoutExample/reactapp/src/paymentMethods/buckaroo
git pull
cd Hyva/CheckoutExample/reactapp
npm run build
```

> [!TIP]
> Always test an upgrade on a staging environment first.

---

## Payment methods

Payment methods are enabled and configured in the main Buckaroo plugin, under **Stores → Configuration → Sales → Buckaroo** in the Magento admin.

> [!IMPORTANT]
> Not every method the main plugin supports is available in this checkout. The methods below are the ones this module renders.

| | | |
|---|---|---|
| [Alipay](https://docs.buckaroo.io/docs/alipay) | [Apple Pay](https://docs.buckaroo.io/docs/apple-pay) | [Bancontact](https://docs.buckaroo.io/docs/bancontact) |
| [Bank Transfer](https://docs.buckaroo.io/docs/transfer) | [Belfius](https://docs.buckaroo.io/docs/belfius) | [Billink](https://docs.buckaroo.io/docs/billink) |
| [Buckaroo Voucher](https://docs.buckaroo.io/docs/buckaroo-voucher) | [Credit and debit cards](https://docs.buckaroo.io/docs/creditcards) | [EPS](https://docs.buckaroo.io/docs/eps) |
| [Giftcards](https://docs.buckaroo.io/docs/giftcards) | [iDEAL / Wero](https://docs.buckaroo.io/docs/ideal) | [In3](https://docs.buckaroo.io/docs/in3) |
| [KBC](https://docs.buckaroo.io/docs/kbc) | [Klarna](https://docs.buckaroo.io/docs/klarna-kp) | [PayPal](https://docs.buckaroo.io/docs/paypal) |
| [PayPerEmail](https://docs.buckaroo.io/docs/payperemail) | [Riverty](https://docs.buckaroo.io/docs/riverty) | [SEPA Direct Debit](https://docs.buckaroo.io/docs/sepa-direct-debit) |
| [Trustly](https://docs.buckaroo.io/docs/trustly) | [WeChatPay](https://docs.buckaroo.io/docs/wechatpay) |  |

---

## Internationalization

The [`i18n`](https://github.com/buckaroo-it/Magento2_Hyva/tree/master/i18n) folder contains a CSV file with the translation strings. Add translations through the standard Hyvä internationalization mechanism — see the [Hyvä i18n documentation](https://hyva-themes.github.io/magento2-react-checkout/i18n/).

---

## Support

Having trouble? Work through this list before reaching out:

1. Confirm the [main plugin](https://github.com/buckaroo-it/Magento2) and the [GraphQL module](https://github.com/buckaroo-it/Magento2_GraphQL) are both installed and active, and that payments work outside the React checkout.
2. Check that you installed the right module for your checkout — this one for Hyvä React Checkout, [Magento2_Hyva_Checkout](https://github.com/buckaroo-it/Magento2_Hyva_Checkout) for Hyvä Checkout.
3. Confirm the method you are testing is in the list above.
4. Rebuild the React app with `npm run build` after any change, and check the browser console for errors.

Still stuck? Contact us and include your Magento version, main plugin version, GraphQL module version, the React checkout codebase you use and the relevant console or log output.

- **Bug reports and feature requests:** [open an issue](https://github.com/buckaroo-it/Magento2_Hyva/issues)
- **Technical support:** [support@buckaroo.nl](mailto:support@buckaroo.nl)
- **Phone:** +31 (0)30 711 50 50
- **Gateway status:** [status.buckaroo.io](https://status.buckaroo.io/)

---

## Contribute

We really appreciate it when developers help improve the Buckaroo plugins. Please read our [Contribution Guidelines](https://github.com/buckaroo-it/Magento2_Hyva/blob/master/CONTRIBUTING.md) before opening a pull request, and target the `master` branch.

Found a security issue? Please report it privately to [support@buckaroo.nl](mailto:support@buckaroo.nl) instead of opening a public issue.

### Community

Developing good products is not possible without the input of a community, and we thank everyone who contributes. A special thank you to the developers at [Mooore](https://www.mooore.nl/), who co-developed this project with us and initiated the collaboration. Your work and expertise have been invaluable.

---

## Versioning

We follow semantic versioning (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes that require additional testing and caution.
- **MINOR** — new functionality with limited impact.
- **PATCH** — bug fixes and hotfixes only.

---

<p align="center">
  <sub>Made with care by <a href="https://www.buckaroo.nl">Buckaroo</a>.<br>
  This document is subject to change; typos and language errors are possible.</sub>
</p>
