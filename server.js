const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Data file path for CMS content persistence
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// API: Get saved content
app.get('/api/content', (req, res) => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json(null);
        }
    } catch (err) {
        console.error('Error reading content:', err);
        res.json(null);
    }
});

// API: Save content
app.post('/api/content', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving content:', err);
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// API: Contact form submissions
app.post('/api/contact', (req, res) => {
    const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');
    try {
        let contacts = [];
        if (fs.existsSync(CONTACTS_FILE)) {
            contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
        }
        contacts.push({
            ...req.body,
            timestamp: new Date().toISOString()
        });
        fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

// API: Get contact submissions (for admin)
app.get('/api/contacts', (req, res) => {
    const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');
    try {
        if (fs.existsSync(CONTACTS_FILE)) {
            const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json([]);
        }
    } catch (err) {
        res.json([]);
    }
});

// Serve the landing page Easter egg at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Serve the main site at /home and as fallback
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`AI Clarity running on port ${PORT}`);
});
