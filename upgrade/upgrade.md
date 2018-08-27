# Lisk Elements Upgrade

If you already have Lisk Elements installed and wish to upgrade your installation, you can follow the instructions below for your specific distribution.

## Upgrade Lisk Elements via NPM

To update your global installation to the latest version of Lisk Elements, simply run the following command:

```shell
npm update --save lisk-elements
```

## Upgrade Lisk Elements from source

Pull the latest tagged release using Git from your Lisk Elements directory:

```shell
git checkout master
git pull origin master
npm install
npm run build
```

## Upgrade Lisk Elements via CDN

When a new release is available, simply update the version number accordingly. For example, if you want to upgrade from v1.0.0 (minified) to v1.1.0 (minified), change this line:

```html
<script src="https://js.lisk.io/lisk-elements-1.0.0.min.js"></script>
```

to this:
```html
<script src="https://js.lisk.io/lisk-elements-1.1.0.min.js"></script>
```

