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
