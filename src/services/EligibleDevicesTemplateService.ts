import {iContact} from '../types/types';

class EligibleDevicesTemplate {
    public static getHTML(contact: iContact):string{
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

export default EligibleDevicesTemplate;