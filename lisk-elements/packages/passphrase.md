# Lisk Elements Passphrase

The Lisk Elements passphrase module provides tools for generating and validating mnemonic passphrases.

- [Installation](#installation)
- [Upgrade](#upgrade)
- [Mnemonic](#mnemonic)
- [Additional validation methods](#additional-validation-methods)
  - [getPassphraseValidationErrors](#getPassphraseValidationErrors)

## Installation

```bash
$ npm install --save @liskhq/lisk-passphrase
```

## Upgrade

```bash
npm update --save @liskhq/lisk-passphrase
```

## Mnemonic

We expose the [bip39](https://www.npmjs.com/package/bip39) npm package for easily generating and managing BIP39-compliant mnemonic passphrases. 
Please refer to their documentation for full usage.

### Example

```js
import * as passphrase from '@liskhq/lisk-passphrase';

const { Mnemonic } = passphrase;

const passphrase = Mnemonic.generateMnemonic(); // 'drastic spot aerobic web wave tourist library first scout fatal inherit arrange'
const japanesePassphrase = Mnemonic.generateMnemonic(null, null, Mnemonic.wordlists.japanese); // 'こやく　そうだん　ねだん　せめる　たらす　むげん　へんたい　さめる　おんだん　こうてい　ていこく　におい'
Mnemonic.validateMnemonic(japanesePassphrase, Mnemonic.wordlists.japanese); // true
```

## Additional validation methods

In addition to the validation provided by the BIP39 library, we provide a helper function to help you understand what has gone wrong with an invalid passphrase.

### getPassphraseValidationErrors

Returns an array of validation errors to help with usability.

#### Syntax

```js
getPassphraseValidationErrors(passphrase, [wordlist], expectedWords)
```

#### Parameters

`passphrase`: The candidate passphrase to validate.

`wordlist`: The wordlist for the passphrase (default is English). Wordlists are provided by the BIP39 library described above.

`expectedWords`: The number of words of the passphrase. 12 is the default value, in case it is undefined.

#### Return value

`array`: An array of errors containing details about why a passphrase is invalid. The array is empty if the passphrase is valid.

#### Examples

```js
import * as passphrase from '@liskhq/lisk-passphrase';

const errors = passphrase.validation.getPassphraseValidationErrors('this passphrase is not    valid', Mnemonic.wordlist.english, 24);
/* [
    {
        code: 'INVALID_AMOUNT_OF_WORDS',
        message: 'Passphrase contains 5 words instead of expected 24. Please check the passphrase.',
        expected: 24,
        actual: 5,
    },
    {
        code: 'INVALID_MNEMONIC',
        message: 'Passphrase is not a valid mnemonic passphrase. Please check the passphrase.',
        expected: true,
        actual: false,
    },
    {
        actual: 7,
        code: 'INVALID_AMOUNT_OF_WHITESPACES',
        expected: 23,
        location: [],
        message:
            'Passphrase contains 7 whitespaces instead of expected 23. Please check the passphrase.',
    },
] */
```
