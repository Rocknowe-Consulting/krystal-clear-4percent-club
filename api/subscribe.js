// Newsletter signup API endpoint
// This is a Vercel serverless function for handling form submissions

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get form data
    const { firstName, lastName, email, company, turnover, consent } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !turnover || !consent) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Validate consent
    if (consent !== 'on' && consent !== true) {
      return res.status(400).json({ 
        error: 'Consent is required' 
      });
    }

    // Prepare subscriber data
    const subscriberData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      company: company.trim(),
      turnover,
      signupDate: new Date().toISOString(),
      source: '4percentclub-landing-page',
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // TODO: Integrate with your email service provider
    // Examples for popular services:

    // Mailchimp Integration
    // await addToMailchimp(subscriberData);

    // ConvertKit Integration
    // await addToConvertKit(subscriberData);

    // SendGrid Integration
    // await addToSendGrid(subscriberData);

    // For now, we'll simulate a successful signup
    console.log('New subscriber:', subscriberData);

    // Send welcome email (optional)
    // await sendWelcomeEmail(subscriberData);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to Kim\'s 4% Club!',
      data: {
        subscriberId: generateSubscriberId(),
        email: subscriberData.email
      }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
}

// Helper function to generate subscriber ID
function generateSubscriberId() {
  return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Example Mailchimp integration
async function addToMailchimp(subscriberData) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    throw new Error('Mailchimp configuration missing');
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: subscriberData.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscriberData.firstName,
        LNAME: subscriberData.lastName,
        COMPANY: subscriberData.company,
        TURNOVER: subscriberData.turnover
      },
      tags: ['4percentclub', 'uk-business']
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add subscriber to Mailchimp');
  }

  return response.json();
}

// Example ConvertKit integration
async function addToConvertKit(subscriberData) {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    throw new Error('ConvertKit configuration missing');
  }

  const url = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: CONVERTKIT_API_KEY,
      email: subscriberData.email,
      first_name: subscriberData.firstName,
      fields: {
        company: subscriberData.company,
        turnover: subscriberData.turnover
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add subscriber to ConvertKit');
  }

  return response.json();
}

// Example SendGrid integration
async function addToSendGrid(subscriberData) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID;

  if (!SENDGRID_API_KEY || !SENDGRID_LIST_ID) {
    throw new Error('SendGrid configuration missing');
  }

  const url = 'https://api.sendgrid.com/v3/marketing/contacts';

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contacts: [{
        email: subscriberData.email,
        first_name: subscriberData.firstName,
        last_name: subscriberData.lastName,
        custom_fields: {
          company: subscriberData.company,
          turnover: subscriberData.turnover
        }
      }],
      list_ids: [SENDGRID_LIST_ID]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add subscriber to SendGrid');
  }

  return response.json();
}

// Example welcome email function
async function sendWelcomeEmail(subscriberData) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@rocknowe.com';

  if (!SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping welcome email');
    return;
  }

  const url = 'https://api.sendgrid.com/v3/mail/send';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: subscriberData.email, name: subscriberData.firstName }],
        dynamic_template_data: {
          firstName: subscriberData.firstName,
          company: subscriberData.company
        }
      }],
      from: { email: FROM_EMAIL, name: 'Kim at Krystal Clear Accounting' },
      template_id: 'd-your-template-id-here' // Replace with your SendGrid template ID
    })
  });

  if (!response.ok) {
    console.error('Failed to send welcome email');
  }
} 