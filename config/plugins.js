module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME", "realEmail@gmail.com"),
          pass: env("SMTP_PASSWORD", "16_char_gmail_app_password"),
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
