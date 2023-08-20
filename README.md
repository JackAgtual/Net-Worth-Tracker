# Net Worth Tracker

Try it out: https://jackagtual.github.io/Net-Worth-Tracker/

This app allows different users to track their net worth over time. The user can enter details about all their assets and liabilities over time to track how their net worth changes over time.

This applicaiton stores unique data for each user. The homepage of the app allows the user can sign in as an existing user or create a new user account.

After logging in or creating a new account, the user's net worth can be viewd in a Net Worth vs. Time graph and in a taular view. Each row in the net worht table can be expanded to see the composition of that specific net wroth entry.

![Homepage](./assets/HomepageScreenshot.png)

## Technical Details

The frontend of this application was made using TypeScript, React, Material UI, and Chart.js. Material UI was used to get a good looking, easy to use, and cohesive user interface. Chart.js was used to display a plot of the user's net worth vs. time chart.

Firebase was used as a backend service for this application to allow users' data to persist across different sessions and machines.

## Installation

After cloning the repo run the following npm commands:

```
npm i
npm run dev
```

## Future Work

- Allow user to edit and delete existing net worth entries
- Authentication with Google
