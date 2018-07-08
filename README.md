# IoT Dashboard
This app provides a useful starting point for building your own Internet of Things application with user authentication. This starter application provides secure data transport with persistent client connectivity and is built with Node, Express, SocketIO, and Firebase-Admin.

SocketIO is a lean JavaScript library for lightning fast realtime communication.

Firebase is Google's cloud backend as a service. Firebase provides many individual services including Authentication, Realtime Database, Cloud Firestore, Cloud Functions, and more. 

This starter project implements [Firebase](https://firebase.google.com/) to provide user login with Google Auth and to read and write to the database.

The Google Auth signin provides more security and a defined userbase from which you can start to build an application community.

![IoT Dashboard](https://cdn.glitch.com/63db31f3-7fa5-43f6-b985-2d1aa61e9d7f%2Fdial.png)

## Getting Started
To get started, you need to:
- Set up your App in Firebase
- Add your app credentials to `.env` and `index.html`
- Customize server and client logic via `server-module-plugin.js` and `client-module-plugin.js` respectively

For more detailed setup instructions, see `SETUP.md`.

For some important design considerations, see `DESIGN.md`.

For an example network topology illustration see `TOPOLOGY.md`.

For insights into the Google Firebase see `FIREBASE.md`.

For information on mail templates or removing mail functionality see `MAIL.md`.

For a preview of the App Screen see `APP_SCREEN.md`

For a discussion of the PLC design see `PLC_DESIGN.md`




