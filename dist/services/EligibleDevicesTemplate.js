"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EligibleDevicesTemplate {
    static getHTML(contact) {
        const html = `
        <html>
          <head>
            <title>Your Eligible Devices</title>
          </head>
          <body>
            <p>Dear ${contact.name},</p>
            <p>Here are your eligible devices:</p>
            <ul>
              <li>Dario Blood Glucose Monitoring Starter Kit</li>
              <li>Dario Blood Pressure Monitoring System</li>
              <li>Dario Glucose Control Solutions</li>
            </ul>
            <p>Dario health services</p>
          </body>
        </html>
      `;
        return html;
    }
}
exports.default = EligibleDevicesTemplate;
//# sourceMappingURL=EligibleDevicesTemplate.js.map