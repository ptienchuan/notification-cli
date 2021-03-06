# Notification CLI

Command line tool to send notification to mobile app

## Stack

- [yargs](https://www.npmjs.com/package/yargs), [chalk](https://www.npmjs.com/package/chalk)
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

#### \$ device pick

Pick device token to prepare for sending notification

##### options:

```
-a
--all

# Pick all device token in the local list
```

```
-t
--token <token-value>

# Pick device token by the token value provided
# Multiple values will be accepted
```

```
-i
--index <token-index>

# Pick device token by the index provided which is displayed at command `list`
# Multiple values will be accepted
```

#### \$ device remove

Pick device token to prepare for sending notification

##### options:

```
-a
--all

# Empty picked list
```

```
-t
--token <token-value>

# Unpick device token by the value provided
# Multiple values will be accepted
```

```
-i
--index <token-index>

# Unpick device token by the index provided which is displayed at command `list`
# Multiple values will be accepted
```

#### \$ device status

Show the list of picked deivce tokens

#### \$ device drop

Drop device expo token globally

##### options:

```
-t
--token <token-value>

# Required option
# Provide the value of device token which you want to drop
# Multiple values will be accepted
```

---

### Notification:
#### \$ notification send

Send notification to the picked devices

##### options:

```
-t
--title <title-value>

# Required option
# Provide the title of notification
```

```
-c
--content <content-value>

# Required option
# Provide the content of notification
```

* * *
