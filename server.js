const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
});

// Route handling - MUST come before static middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'landing.html'));
});

app.get('/quest', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'quest.html'));
});

// Stats API for landing page counter
app.get('/api/stats', (req, res) => {
  // Mock data for now - will evolve to real tracking
  const playersActive = Math.floor(Math.random() * 100) + 1200; // Random between 1200-1300
  res.json({ playersActive });
});

// Claude API proxy (preserve existing functionality)
app.post('/api/claude', async (req, res) => {
  try {
    const { apiKey, ...requestBody } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: { 
        message: 'Connection failed - check internet',
        type: 'network_error'
      } 
    });
  }
});

// Static file serving - comes after specific routes
app.use(express.static(path.join(__dirname, 'app'), {
  setHeaders: (res, filePath) => {
    // Cache static assets for 1 minute
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=60');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`ShipQuest server running on port ${PORT}`);
});