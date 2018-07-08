# MAIL

## MAIL TEMPLATES
Thoughtful integration of emails can be an effective means of notifying and engaging your members. Other than the initial thank you email, all other emails should be `opt in` and should include an `unsubscribe link`. 

These tools are helpful in designing mail templates:


<a href="https://www.gillmeister-software.com/online-tools/text/remove-line-breaks.aspx" no-opener no-referrer>Tool to Remove Line Breaks</a>

<a href="https://www.freeformatter.com/html-formatter.html#ad-output" no-opener no-referrer>Tool to Pretty Format HTML</a>

<a href="https://colorlib.com/wp/responsive-html-email-templates/" no-opener no-referrer>Responsive HTML Email Templates</a>

## ADDING MAIL FUNCTIONALITY
If you decide to have a mail service as part of your administrative IoT application, you must do the following:

  1) Sign up for <a href="https://sendgrid.com/" no-opener no-referer>SendGrid email service</a> and generate a Node.js API key.
  2) In `.env` enter your SendGrid Node.js API key.
  3) In `mail.js`, uncomment lines 3, 5-16
  4) In `mail.js`, change the link in `line 8` to your site address.
  5) In `socket.js`, uncomment line 30
