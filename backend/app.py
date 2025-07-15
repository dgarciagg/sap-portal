from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Importar CORS
import requests
import urllib3

# Desactivar advertencias por certificado SSL autofirmado
urllib3.disable_warnings()

app = Flask(__name__)
CORS(app)  # ✅ Habilitar CORS para permitir solicitudes desde Angular (localhost:4200 por defecto)

# Parámetros de conexión al Service Layer
SAP_URL = "https://172.191.142.146:50000/b1s/v1"
USERNAME = "SIGLO\\SOPORTETI"  # Doble backslash por sintaxis de cadena
PASSWORD = "^nTJPkR8pX"
COMPANY = "Z_PRU_CO_ANALDEX_PROD_DESARROLLO"

# Endpoint para crear pedidos de venta
@app.route("/crear-pedido", methods=["POST"])
def crear_pedido():
    # Paso 1: Login
    login_url = f"{SAP_URL}/Login"
    login_payload = {
        "CompanyDB": COMPANY,
        "UserName": USERNAME,
        "Password": PASSWORD
    }
    headers = { "Content-Type": "application/json" }

    login_response = requests.post(login_url, json=login_payload, headers=headers, verify=False)

    if login_response.status_code != 200:
        return jsonify({
            "error": "Fallo en autenticación SAP",
            "detalle": login_response.text
        }), 500

    cookies = {
        "B1SESSION": login_response.cookies.get("B1SESSION"),
        "ROUTEID": login_response.cookies.get("ROUTEID")  # En caso de balanceador
    }

    # Paso 2: Crear pedido
    pedido_url = f"{SAP_URL}/Orders"
    pedido_payload = request.get_json()

    pedido_response = requests.post(pedido_url, json=pedido_payload, headers=headers, cookies=cookies, verify=False)

    if pedido_response.status_code != 201:
        return jsonify({
            "error": "Fallo al crear el pedido",
            "detalle": pedido_response.text
        }), 500

    return jsonify({
        "mensaje": "Pedido creado exitosamente",
        "respuesta": pedido_response.json()
    }), 201

# Endpoint para listar últimos pedidos
@app.route("/listar-pedidos", methods=["GET"])
def listar_pedidos():
    # Paso 1: Login
    login_url = f"{SAP_URL}/Login"
    login_payload = {
        "CompanyDB": COMPANY,
        "UserName": USERNAME,
        "Password": PASSWORD
    }
    headers = { "Content-Type": "application/json" }

    login_response = requests.post(login_url, json=login_payload, headers=headers, verify=False)

    if login_response.status_code != 200:
        return jsonify({
            "error": "Fallo en autenticación SAP",
            "detalle": login_response.text
        }), 500

    cookies = {
        "B1SESSION": login_response.cookies.get("B1SESSION"),
        "ROUTEID": login_response.cookies.get("ROUTEID")
    }

    # Paso 2: Obtener pedidos
    pedidos_url = f"{SAP_URL}/Orders?$orderby=DocEntry desc&$top=10"
    pedidos_response = requests.get(pedidos_url, headers=headers, cookies=cookies, verify=False)

    if pedidos_response.status_code != 200:
        return jsonify({
            "error": "Fallo al obtener los pedidos",
            "detalle": pedidos_response.text
        }), 500

    return jsonify(pedidos_response.json()), 200

# Ejecutar aplicación Flask
if __name__ == "__main__":
    app.run(debug=True, port=5000)
