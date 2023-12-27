module.exports = {
  async afterCreate(event) {
    console.log("afterCreate hook triggered", event.result);

    try {
      const { Name, Email, Story } = event.params.data; // Adjust according to your field names
      const id = event.result && event.result.id;
      const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>New Submission</title>
        </head>
        <body>
          <div
            class="email-container"
            style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto"
          >
            <div
              class="header"
              style="background-color: #ff1a16; padding: 20px; text-align: center"
            >
              <img
                src="logo"
                alt="Logo"
                width="200"
              />
            </div>
            <div
              class="content"
              style="
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #dedede;
              "
            >
              <h2>New Submission Received!</h2>
              <p>
                Dear Annie,
                <br />
                <br />
                I am pleased to inform you that a new submission has been received via
                the contact form on our website.
                <br />
                <br />
                Below are the primary details for your initial review:
              </p>
              <div class="form-content">
                <div><strong>Name:</strong> ${Name}</div>
                <div style="margin-top: 6px">
                  <strong>Email:</strong> ${Email}
                </div>
                <p>
                  <strong>Story:</strong>
                </p>
                <p>${Story}</p>

                <br />
                <p class="note" style="font-size: 14px; color: lightslategray">
                  For your convenience, a comprehensive view of the submission,
                  including any attachments, is available in our Content Management
                  System.
                </p>
                <a
                  href="http://localhost:1337/admin/content-manager/collectionType/api::email.email/${id}"
                  class="btn"
                  style="
                    background-color: #ff1a16;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 10px;
                  "
                  >View Details</a
                >
              </div>
              <br />
              <br />
              <p>
                We recommend reviewing the submission at your earliest convenience to
                ensure timely response and engagement.
                <br />
                <br />
                Thank you for your attention to this new opportunity.
              </p>
            </div>
            <div
              class="footer"
              style="
                background-color: #f8f9fa;
                padding: 10px;
                text-align: center;
                font-size: 12px;
              "
            >
              &copy; 2024 sovai .inc. All rights reserved.
            </div>
          </div>
        </body>
      </html>

      `;
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "keansovai@gmail.com", // or use event.params.data.to if your content-type includes recipient address
          from: "dotdotdot-fe@gmail.com", // the sender email address
          subject: "New Email Content Created", // you can customize this
          text: `A new email content from "${event.params.data.Name}" has been created.`, // customize as needed
          html: emailHtml,
        });
    } catch (err) {
      console.log("Error sending email:", err);
    }
  },
};
