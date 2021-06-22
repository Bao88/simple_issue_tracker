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
  - Deletions
  - ~~Integrate database~~
  - ~~Backend checks for data validity~~
  - Websocket to update users table "realtime" so multiple users can use the app in paralell.
- Frontend:
  - ~~Integrate a store(to keep the state) to separate codes into smaller components.~~
  - Drag and drop of issues
  - ~~Improve responsiveness~~
  - ~~Handling of updates.~~
  - Find out why favicon doesnt work on EDGE

# Feedback

## general cons

- readme missing command to start server
- UI looks horrible
- ~~completely no RWD~~
- ~~`HelloWorld.vue` not used xD~~

## general pros

- instructions how to start front
- nice description of was is done
- a lot of relevant possible improvements listed

## back pros

- app is very simple, no abstractions
- code is very easy but also not many features implemented there so..

## back cons

- ~~express used but not added to deps~~
- ~~doesn't use any db, just storing in memory. Good enough, but hard to judge the skills based on that.~~
- ~~no data validation~~
- ~~code to validate issue states in the comment only~~

## front pros

- CSS grid used

## front cons

- ~~everything in 1 component - usually this is a big minus. Logic mixed with presentation and styling~~ [https://v3.vuejs.org/guide/single-file-component.html#introduction](Single File Component)

## How to use

You will need to install MongoDB and run it locally.
This is for development / educational purposes only.

## Development setup

1. Run "yarn install"
2. yarn run serve:app
3. yarn run server

## Let server serve the app

1. Run "yarn install"
2. yarn run build:app
3. yarn run server
4. Use the URL provided in the terminal after running the server to access the app.

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

### Run server (For front end to communicate with server)

```
yarn run server
```

### Lints and fixes files

```
yarn lint
```
