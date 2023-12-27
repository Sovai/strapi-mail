## 1. Setup email provider

- install nodemailer

```bash
npm i @strapi/provider-email-nodemailer
```

- create a file in config/plugins.js

```js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME", "realEmail@gmail.com"),
          pass: env("SMTP_PASSWORD", "16_char_gmail_app_password"), // generate in gmail security settings
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "displayFromEmail@gmail.com",
        defaultReplyTo: "displayToEmail@gmail.com",
      },
    },
  },
});
```

- test send email in strapi settings

## 2. Fire email send when content type is created

- create new content type (in this case I named it Email)
- add necessary fields (name, email, message...)
- create lifecircle hook in api/email/content-types/email/lifecycles.js

```js
module.exports = {
  async afterCreate(event) {
    console.log("afterCreate hook triggered", event.params.data);

    try {
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "xxx@gmail.com", // or use event.params.data.to if your content-type includes recipient address
          from: "xxx-fe@gmail.com", // the sender email address
          subject: "New Email Content Created", // you can customize this
          text: `A new email content from "${event.params.data.Name}" has been created.`, // customize as needed
          html: `<h1>A new lead has contacted you on dotdotdot website contact form</h1>
              <h2>Here are the details:</h2>
              <p>Subject: ${event.params.data.Subject} </p>
              <p>Name: ${event.params.data.Name}</p>
              <p>Email: ${event.params.data.Email}</p>
              <b>Story:</b>
              <p>${event.params.Story}</p>
              <br />
              <br />
              <br />
              <p>Dotdotdot Contact form,</p>
              `, // customize as needed
        });
    } catch (err) {
      console.log("Error sending email:", err);
    }
  },
};
```

- now when you create new content type, the email will be sent to the recipient address
