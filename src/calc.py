from flask import Flask, jsonify, render_template
from flask_basicauth import BasicAuth

app = Flask(__name__,static_url_path='/static')

app.config['BASIC_AUTH_USERNAME'] = 'daw'
app.config['BASIC_AUTH_PASSWORD'] = 'prova'

basic_auth = BasicAuth(app)

@app.route('/')
@basic_auth.required
def access_calc():
    return render_template('index.html')

def suma(op1, op2):
    n_op1 = float(op1)
    n_op2 = float(op2)
    resultat = {'operador': 'suma','resultat ' : n_op1 + n_op2}
    return jsonify(resultat), 200

def resta(op1, op2):
    n_op1 = float(op1)
    n_op2 = float(op2)
    resultat = {'operador': 'resta','resultat ' : n_op1 - n_op2}
    return jsonify(resultat), 200

def multiplicacio(op1, op2):
    n_op1 = float(op1)
    n_op2 = float(op2)
    resultat = {'operador': 'multiplicacio','resultat ' : n_op1 * n_op2}
    return jsonify(resultat), 200

def divisio(op1, op2):
    n_op1 = float(op1)
    n_op2 = float(op2)
    resultat = {'operador': 'divisio','resultat ' : n_op1 / n_op2}
    return jsonify(resultat), 200

if __name__=='__main__':
    app.run(host='0.0.0.0', port='5050')
