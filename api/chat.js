export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const body = req.body;
  body.max_tokens = 2000;

  if (body.system) {
    body.system = body.system + '\n\nABSOLUTE RULE: Respond with ONLY a JSON object. Start with { end with }. No markdown. No backticks. No text outside the JSON. If your response would be too long, shorten the summary and reduce table rows — but always return valid complete JSON.';
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}