// Simple test API endpoint to verify Vercel routing
export default async function handler(req, res) {
  return res.status(200).json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
} 