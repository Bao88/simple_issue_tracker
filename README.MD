# simple_issue_tracker

This is a fullstack project using NodeJS as backend and Vue3 as Frontend.
It is a simple issue tracker where you can keep track of your issues.
Currrently it can:

- Create issues
- Modify the issue (title, description and state)
- Changing the state will move the issue to the correct column.
- We have 3 states which does the following:
  - "Open" can be changed to either Pending or Closed
  - "Pending" can be changed to Closed but not to Open
  - "Closed" can't change state.

Improvement:

- Backend:
  - Integrate database
  - Backend checks for data validity
  - Websocket to update users table "realtime" so multiple users can use the app in paralell.
- Frontend:
  - Use HTML "table" element
  - Integrate a store(to keep the state) to separate codes into smaller components.
  - Drag and drop of issues
  - Improve responsiveness
  - Handling of updates.
  - Find out why favicon doesnt work on EDGE

## How to use

-

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve:app
```

### Compiles and minifies for production

```
yarn run build:app
```

### Run server

```
yarn run server
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
