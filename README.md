# Robot game

## Start game
### Run app locally:

Install all required dependencies:

```
yarn install
yarn dev
yarn dev-readline # stdin as input source, explained below
```

### Run app in docker

```
yarn dev-container
yarn dev-readline-container # stdin as input source, explained below
```

## 2 input sources

This app supports 2 types of input:

1. Stdin
2. HTTP request

### Stdin

For this mode, user will need to provide list of commands with the last one of `EXIT` to exit the app.

To prevent infinite input from user, there is a upper limit of 1000 commands, where if more commands are provided the app will exit.

To run app in this mode locally, add `--readline` at the end of the command line.

To run app in this mode in docker, simply run `yarn dev-readline-container`

### HTTP request

This mode is built in `express`, where the app will receive HTTP request with body of list of commands separated by newline character. The limit of request body is default to `1MB`.

To send the request in correct format, the request header will need to be `text/plain`, otherwise user will receive `500` error (though they will not see stack trace).

## Error handling

The app will catch error and log it properly. Users are not supposed to see stack trace.

## Deploy to production

The docker file can be used to build the image. The commands are in the order such that change in the source file will not re-install the npm packages so it should be efficient for frequent deployment.
