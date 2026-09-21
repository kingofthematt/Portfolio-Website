#!/usr/bin/env python3
"""
Local server for the flashcard app.
Serves this folder with caching disabled so edits show up on refresh.
"""

import http.server
import os
import socketserver
import webbrowser
from pathlib import Path

PORT = 8010

os.chdir(Path(__file__).parent)


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"Flashcards running at {url}")
    print(f"Serving files from: {os.getcwd()}")
    print("Press Ctrl+C to stop the server")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
