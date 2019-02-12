# Lisk Mobile documentation

Lisk Mobile is the official LSK wallet for smartphones.
Lisk Mobile is a cross-platform application written in React Native and primarily build for iOS and Android.

- [Download](#download)
- [Features](#features)
  - [Send and request LSK tokens](#send-and-request-lsk-tokens)
    - [QR-Code scanner](#qr-code-scanner)
    - [iMessage Extension](#imessage-extension)
    - [Lisk URL](#lisk-url)
  - [Account history](#account-history)
  - [Account creation](#account-creation)
  - [Dark mode](#dark-mode)
  - [Discreet mode](#discreet-mode)
  - [3d touch action menu](#3d-touch-action-menu)
  - [Bookmarks](#bookmarks)
  - [Login methods](#login-methods)
    - [Login with passphrase](#login-with-passphrase)
    - [Login with fingerprint](#login-with-fingerprint)
    - [Login via face-ID](#login-via-face-id)    
- [Contribute to the Codebase](#contribute-to-the-codebase)

## Download

[![Get it on iTunes](https://lisk.io/assets/svg/download_on_the_app_store_badge.svg)](https://itunes.apple.com/us/app/lisk/id1436809559?mt=8) [![Get it on Google Play](https://lisk.io/assets/svg/download_on_the_play_store_badge.svg)](https://play.google.com/store/apps/details?id=io.lisk.mobile&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

## Features

### Send and request LSK tokens

Lisk Mobile offers different options for easy LSK transfer:

#### QR-Code scanner

> The QR-Code scanner needs access to the camera in order to work.

#### iMessage Extension

Users with iOS devices can utilize the instant messenger "iMessage" to send and receive LSK without leaving the iMessage app.

#### Lisk URL

Quickly send LSK or request LSK, by utilizing Lisk URLs.
By clicking on the respective link, it will open Lisk Mobile on the desired page and with predefined values.

##### Send LSK

```
lisk://wallet?recipient=1L&amount=1&reference=test
```

##### Request LSK

```
lisk://request
```

### Account history

View the details of previous transactions on the dashboard in a chronological order.
Click on the transaction to view further transaction details of that particular transaction.


> The Lisk URL to display a specific transaction:
> ```
> lisk://transactions?id=1
> ```

### Account creation

Lisk Mobile offers the possibility to freshly create a new Lisk ID, in case the user doesn't have an Account, yet.

### Discreet Mode

The discreet mode blurrs the sensitive information inside Lisk Mobile.
This helps protecting your privacy, e.g. when using Lisk Mobile at public places.

Following information gets blurred:
- account balance
- transaction amounts

### Dark mode

The style of Lisk Mobile can be changed on the "Settings" page.

### 3D touch action menu

Quick way to perform most popular actions of Lisk Mobile, without the need to open the app.

### Bookmarks

Bookmarks save other Lisk adresses in Lisk Mobile like in an address book.
To save a Lisk ID as bookmark, it is needed to specify a unique identifier, e.g. the name of the person, that own the respective Lisk ID.

To bookmark an account, go to "Bookmarks" page and hit the "+"-button.
Then define the respective adress and a label to be associated with that address.
To save the bookmark, hit the "Add to bookmarks"-button.

> The user can choose conveniently between the existing bookmarks, when sending tokens with Lisk Mobile.

### Login methods

#### Login with passphrase

Default way to log in to Lisk Mobile. Insert your passphrase and hit the login button.
In case a second passphrase has been activated for this account, it needs to be provided as well.

#### Login with Fingerprint

This function can be enabled on the "Settings" page of Lisk mobile, if the device supports biometric login methods.

#### Login via Face ID 

This function can be enabled on the "Settings" page of Lisk mobile, if the device supports biometric login methods.

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Core project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Mobile Github](https://github.com/LiskHQ/lisk-mobile).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-mobile/blob/development/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).

