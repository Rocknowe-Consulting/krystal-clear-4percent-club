// Newsletter subscription API endpoint for The 4% Club
// Built by Rocknowe Consulting for Krystal Clear Accounting

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    // Parse request body
    const { firstName, lastName, email, company, turnover, consent } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !turnover || !consent) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'All fields are required to join The 4% Club newsletter'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please enter a valid email address'
      });
    }

    // Validate consent
    if (!consent) {
      return res.status(400).json({
        error: 'Consent required',
        message: 'You must agree to receive The 4% Club newsletter'
      });
    }

    // Log the subscription (in production, this would be saved to a database)
    console.log('New newsletter subscription:', {
      firstName,
      lastName,
      email,
      company,
      turnover,
      timestamp: new Date().toISOString(),
      source: 'The 4% Club Landing Page'
    });

    // TODO: Integrate with email service (Mailchimp, ConvertKit, SendGrid, etc.)
    // Example integration placeholders:
    
    // Mailchimp Integration:
    // const mailchimp = require('@mailchimp/mailchimp_marketing');
    // mailchimp.setConfig({
    //   apiKey: process.env.MAILCHIMP_API_KEY,
    //   server: process.env.MAILCHIMP_SERVER_PREFIX,
    // });
    // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
    //   email_address: email,
    //   status: 'subscribed',
    //   merge_fields: {
    //     FNAME: firstName,
    //     LNAME: lastName,
    //     COMPANY: company,
    //     TURNOVER: turnover
    //   }
    // });

    // ConvertKit Integration:
    // const convertkit = require('convertkit');
    // const client = convertkit(process.env.CONVERTKIT_API_KEY);
    // await client.subscribers.create({
    //   email: email,
    //   first_name: firstName,
    //   fields: {
    //     company: company,
    //     turnover: turnover
    //   }
    // });

    // SendGrid Integration:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: 'kim@krystalclearaccounting.com',
    //   subject: 'Welcome to The 4% Club!',
    //   templateId: 'd-xxxxxxxxxxxxxxxxxxxxxxxx',
    //   dynamicTemplateData: {
    //     firstName: firstName,
    //     company: company
    //   }
    // });

    // Send welcome email (placeholder)
    // In production, this would be handled by your email service
    console.log(`Welcome email would be sent to ${email}`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Welcome to The 4% Club!',
      data: {
        firstName,
        email,
        company,
        subscriptionDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return res.status(500).json({
      error: 'Subscription failed',
      message: 'There was an error processing your subscription. Please try again or contact support.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 