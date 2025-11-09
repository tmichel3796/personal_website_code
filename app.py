# Flask app with dynamic, config-driven site settings
from flask import Flask, render_template
import json, os

app = Flask(__name__, static_folder='static', template_folder='templates')

CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config.json')

def load_config():
    """Reload config.json on each request so edits take effect immediately."""
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def home():
    config = load_config()
    return render_template('index.html', config=config)

if __name__ == '__main__':
    # Dev server; in production, run via gunicorn/WSGI
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
