module.exports = {
  settings: {
    cors: {
      enabled: true,
      headers: "*",
      origin: ["localhost", "https://mail.google.com"], // Add the domains you want to allow
    },
  },
};
