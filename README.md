# Notification CLI

Command line tool to send notification to mobile app

## Stack

- [yargs](https://www.npmjs.com/package/yargs)
- [ts-node](https://www.npmjs.com/package/ts-node), [typescript](https://www.npmjs.com/package/typescript)

## Setup

```
$ git clone https://github.com/ptienchuan/notification-cli.git

$ npm install
```

## How to run command

```
$ npm run <function> <command> -- [options]

Example:
$ npm run device fetch
$ npm run device drop -- --token token1 token2
```

Or you can install `ts-node` and `typescript` globally then run:

```
$ ts-node <function-file-path> <command> [options]

Example:
$ ts-node device.ts fetch
$ ts-node device.ts drop --token token1 token2
```

## Function and command

### Device:

#### \$ device fetch

Sync the list of device tokens from cloud to local

#### \$ device list

Show the list of deivce tokens

#### \$ device drop

Drop device expo token

##### options:

    -t
    --token <token-value>

Required option. Provide the value of device token which you want to drop.

You can drop only one value: `$ device drop --token token1`

You also can drop multiple values: `$ device drop --token token1 token2 token3`

### Message:
