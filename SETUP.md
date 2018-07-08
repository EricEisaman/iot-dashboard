# <a href="https://www.youtube.com/watch?v=cRvnLB-m0uM" no-opener no-referer>Setup Video</a>

## What You Need
*   A <a href="https://firebase.google.com/" no-opener no-referrer>Google Account</a>

## Step 1: Set up your App in Firebase
Start by <a href="https://glitch.com/edit/#!/remix/yha-iot" no-opener no-referrer>remixing this starter project</a>, so that you have your own copy of the code. Then create a new project from the <a href="https://console.firebase.google.com/" no-opener no-referrer>Firebase Console</a> by selecting `Create new project` and setting your project name and region. You can then create a Service Account by clicking on the Settings cog icon and selecting `Project Settings > Service Accounts.` This will default to a Firebase-Admin service account.  Click the button shown to generate and download a JSON key file containing your credentials.

## Step 2: Adding credentials and email setup
Using the details in that JSON file, we can now enter our Firebase app credentials into the `.env` file.

Now you need to paste the initialization snippet (Select `Add Firebase to your web app` from your app's homepage in Firebase) into the head of `public/index.html`, replacing `lines 17-29`.

This application is setup to use <a href="https://sendgrid.com" no-opener no-referrer>SendGrid</a> to send notification emails however, mail service is disabled by default. If you wish to enable mail service, read the instructions in `MAIL.md`.

## Step 3: Configure Your App
Lastly, since this example uses Google Auth, we need to enable Google Auth from the `Auth > Sign-in Method` tab in Firebase. Then add your project's publish URL to the list of `OAuth redirect domains` further down the page. Your project's publish URL is the URL shown when you click `Show` and will have the format `project-name.glitch.me`. So in our example, we entered `yha-iot.glitch.me` after selecting `Add Domain`, and then we click `Add` to finish.

## Primary Code Touch Points
The parts of the codebase you will work with most are:
![Server Module Plugin](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2Fsmp.png)
*   `custom/server-module-plugin.js` implements:
    * the <a href="https://firebase.google.com/docs/database/admin/start" no-opener no-referrer>Firebase-Admin API</a> which has full read/write access to the entire database.
    * the back-end components for sending notification emails, updating project metadata and listening out for in-app events and HTTP requests.
    * <a href="https://socket.io/" no-opener no-referrer>Socket.IO</a> enabling persistent realtime web socket  connections with your clients.

![Client Module Plugin](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2Fcmp.png)
*   `public/client-module-plugin.js` implements:
    * the <a href="https://www.firebase.com/docs/web/api/" no-opener no-referrer>Firebase JavaScript API</a> for enabling clients direct access to the database. Appropriate <a href="https://pastebin.com/raw/qK3gfzK3" no-opener no-referrer>database rules</a> must be published to restrict client READ/WRITE access to a subset of the database.
    * <a href="https://socket.io/" no-opener no-referrer>Socket.IO</a> enabling persistent realtime  web socket connections to the Node.js server.
    
*   `mail-templates.json`
    * Provides a JSON store for custom email templates.

You can now go to your app and login with Google Auth. Your next step is to design and build your own IoT network flow using this wonderful starter app.
