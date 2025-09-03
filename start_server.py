#!/usr/bin/env python3
"""
Simple development server for the website.
Shows changes immediately without caching.
"""

import http.server
import socketserver
import os
from pathlib import Path

# Set the port
PORT = 8000

# Change to the directory containing this script
os.chdir(Path(__file__).parent)

# Create a custom handler that disables caching
class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

# Create the server
with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    print(f"🚀 Development server running at http://localhost:{PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print("🔄 Changes will be visible immediately - just refresh your browser!")
    print("⏹️  Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n�� Server stopped.")

