from flask import Flask, jsonify, render_template
from flask_cors import CORS
import speedtest
import socket

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

def check_internet():
    try:
        socket.create_connection(("www.google.com", 80), timeout=5)
        return True
    except OSError:
        return False

@app.route('/api/speedtest')
def speed_test():
    if not check_internet():
        return jsonify({'error': 'Internet not connected'}), 503

    st = speedtest.Speedtest()
    st.get_best_server()

    download_speed = st.download() / 1_000_000
    upload_speed = st.upload() / 1_000_000
    ping = st.results.ping

    return jsonify({
        'download': download_speed,
        'upload': upload_speed,
        'ping': ping
    })

if __name__ == "__main__":
    app.run(debug=True)
