import sys

import logging
import socket
import threading
import json

from pipeline2.utils.utils import Utils

# Config path
CONFIG_PATH = "D:\Projet\PullGithub/Angular_electron_dcc/electron-angular/socketio-server/config/config.json"

# default value
HOST = "192.168.1.15"
PORT = 12346
CONNECTIONS = 1

########################################
# Base class for all dccs socket server
########################################
class BaseSocketServer(object):

   
    def __init__(self):
        self.serverRunning = True
        logging.basicConfig(level=logging.DEBUG)

    
    def get_unused_ports(self, host, start_port, end_port):
        available_ports = []
        ports = range(start_port, end_port)
        
        for i in ports:
            if(Utils.is_port_is_use(host, i)):
                available_ports.append(i)

        return available_ports

    # --- Override Part ---
    
    def get_available_ports(self):
        """
        Get Available (unused) Port
        :param:
        :return list of available ports:
        """
        available_ports = []

        # Read json file, get port range
        with open(CONFIG_PATH) as config:
            data = json.load(config)
        
        port_settings= data['dccPortSettings']
        port_start = port_settings['mayaPortRangeStart']
        port_end = port_settings['mayaPortRangeEnd']

        available_ports = Utils.get_unused_ports(HOST, port_start, port_end)
        print(available_ports)


        return available_ports

    def function_to_process(self, data, client):
        """
        Function to execute
        received command (callback)
        :param data: Received Data
        :param client: Client Connection
        :return:
        """
        logging.error("function_to_process not implemented")
        
    
    def process_update(self, data, client):
        """
        Process Update
        to redirect execution of data received (onMainThread for maya, fo exemple)
        :param data: Received Data
        :param client: Client Connection
        :return:
        """
        logging.error("process_update not implemented")

    # route action
    def on_shutdown(self):
        """
        On Shutdown Action
        :param:
        :return:
        """
        self.serverRunning = False

    # route action
    def on_identify_dcc(self, client):
        """
        On Identify Dcc Action
        :param client: Client Connection
        :return:
        """
        client.send("Idendity not implemented")

    # --- End Override Part ---
   



    # Generic method to start all server in python 2
    def main_server(self, host=HOST, port=PORT, connections=CONNECTIONS):
        """
        Main server
        :param host: Host IP or localhost
        :param port: Integer
        :param connections: Integer Number of connections to handle
        :return:
        """
        #self.get_available_ports()
        #if(len(available_ports) == 0): # No port available
        #return

        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind((host, port))
        except Exception, socket_error:
            msg = "Socket Server, Failed to open port: {}".format(socket_error)
            logging.error(msg)
            return

        sock.listen(connections)
        logging.info("Starting Server: {}".format(port))

        while self.serverRunning:
            client, address = sock.accept()
            data = client.recv(1024)
            if data:
                if data == "#Shutdown#":
                    self.on_shutdown(self)

                if data == "#Identify#":
                    self.on_identify_dcc(client)

                else:
                    logging.info("Socket Server, Data Received: {}".format(data))
                    self.process_update(data, client)

            try:
                client.close()
            except Exception, client_error:
                logging.info("Socket Server, Error Closing Client Socket: {}".format(client_error))

        logging.info("Socket Server, Shutting Down.")
        try:
            sock.close()
        except Exception, close_error:
            logging.info("Socket Server, Error Closing Socket: {}".format(close_error))