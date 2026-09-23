# Changelog

All notable changes to this module are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this module follows semantic versioning as described in the [Versioning](README.md#versioning) section of the README.

## [Unreleased]

### Changed

- Rewrote the README with updated requirements, installation, upgrade, payment method and support information (BTI-1299).

## [1.1.0] - 2026-01-06

### Added

- iDEAL 2.0 support (BP-5258, [#30](https://github.com/buckaroo-it/Magento2_Hyva/issues/30)). Thanks to [@ennostuurman](https://github.com/ennostuurman) for the contribution in [#32](https://github.com/buckaroo-it/Magento2_Hyva/pull/32).

### Changed

- Updated the logo in the README.

## [1.0.1] - 2024-02-05

### Fixed

- Order could not be completed with Bancontact configured without client-side encryption (BP-2546).
- Giftcard amount was refunded after the checkout process was not finished (BP-2377).
- Giftcard validation message.
- Yup validation issue.

## [1.0.0] - 2023-03-27

### Added

- Initial release.

[Unreleased]: https://github.com/buckaroo-it/Magento2_Hyva/compare/v1.1.0...develop
[1.1.0]: https://github.com/buckaroo-it/Magento2_Hyva/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/buckaroo-it/Magento2_Hyva/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/buckaroo-it/Magento2_Hyva/releases/tag/v1.0.0
