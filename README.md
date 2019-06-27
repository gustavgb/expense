# Expense

Preview at https://expense.gustavgb.com.

## Goal

I want to create an app that makes it easy to document previous expenses at regular intervals, to enable an overview of private expenses and divide these into categories. Untimately the user should be able to seamlessly know whether they have spent more than they have earned in a given period (month, week, etc.).

## Stack

This app will be developed using React for the front-end and Firebase Authentication and Firestore for private and persistent user data. I will not be using Redux, because the app is simple enough to develop using [hooks](https://reactjs.org/docs/hooks-intro.html) only. Furthermore SSR is not necessary, because authentication is handled in the front-end and all data is private. This means no data is available to the server during the initial render, which means server rendering is pointless, as the server will just render a blank page in any case.

## Preparation

Make sure you have node and npm set up on your machine, and then run `npm install`

## How to develop

`npm run start`

This will launch webpack dev server, which is available at http://localhost:8080.

## How to build

`npm run build`

Distribute the *dist/* directory.
