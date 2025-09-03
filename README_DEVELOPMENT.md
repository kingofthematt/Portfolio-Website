# Local Development Server

This is a simple way to run your website locally and see changes in real-time!

## Quick Start (Windows)

### Option 1: Double-click (Easiest)
1. **Double-click** `start_server.bat`
2. Your browser will open automatically to `http://localhost:8000`
3. Make changes to your HTML, CSS, or JavaScript files
4. **Refresh your browser** to see the changes

### Option 2: Command Line
1. **Open PowerShell** in this folder
2. **Type**: `python start_server.py`
3. Your browser will open automatically
4. Make changes and refresh to see updates

## How It Works

- **Port 8000**: Your website runs on `http://localhost:8000`
- **No Caching**: The server disables browser caching so you always see the latest changes
- **Simple**: Just HTML, CSS, and JavaScript files served directly

## Troubleshooting

### "Port 8000 is already in use"
- Close any other browsers or servers
- Or change the port in `start_server.py` (line 22)

### "Python not found"
- Install Python from [python.org](https://python.org)
- Make sure to check "Add Python to PATH" during installation

### "HELLO text not showing"
- Make sure you're using the new server (not Docker)
- Check that you're on `http://localhost:8000`
- Try a hard refresh: `Ctrl + F5`

## Stopping the Server

- **Press `Ctrl + C`** in the terminal/PowerShell
- Or just close the terminal window

## Why This Instead of Docker?

- **Simpler**: No complex setup or commands
- **Faster**: Instant file updates
- **Easier**: Just double-click to start
- **No Installation**: Uses Python that's usually already installed

## File Structure

```
web/
├── index.html          # Main website
├── styles.css          # Styling
├── script.js           # JavaScript
├── start_server.py     # Python server
├── start_server.bat    # Windows launcher
└── README_DEVELOPMENT.md  # This file
```

Happy coding! 🚀

