import sys
from pipeline2.utils.utils import Utils

import logging
import socket
import threading
import json



########################################
# Base class for all dccs socket server
########################################
class BaseSocketServer(object):

    CONFIG_PATH = "D:/Projet/PullGithub/Angular_electron_dcc/electron-angular/socketio-server/config/config.json"

    CONNECTIONS = 1
    HOST = "192.168.1.15"
   
    def __init__(self):
        self.serverRunning = True
        logging.basicConfig(level=logging.DEBUG)

    
    def get_available_ports(self, host, port_start, port_end):
        """
        Get Available Ports
        :param host: host/
        :param port_start: start port of range
        :param port_end: end port of range (included)
        :return list: list of port available
        """
        available_ports = Utils.get_unused_ports(host, port_start, port_end+1)
        return available_ports

    def start_server(self, port_start, port_end, connections=CONNECTIONS):
        """
        Start Server just before start
        :port_start: start range of port
        :port_end: end range onf port
        :return:
        """

        # The server need to find where he CAN run, on wich port
        host = Utils.get_current_host() # get localhost
        available_ports = self.get_available_ports(host, port_start, port_end)
        
        if(len(available_ports) < 1) : return # if no port available

        # else, take the first or array
        threading.Thread(target=self.main_server, args=(host, available_ports[0], connections)).start()

    def get_config(self):
        """
        Get Config
        :param:
        :return json data: return config file as data
        """
        # Read json file
        with open(self.CONFIG_PATH) as config:
            data = json.load(config)

        return data
    # --- Override Part ---

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
    def main_server(self, host, port, connections):
        """
        Main server
        :param host: Host IP or localhost
        :param port: Integer
        :param connections: Integer Number of connections to handle
        :return:
        """
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind((host, port))
        except Exception, socket_error:
            msg = "Socket Server, Failed to open port: {}".format(socket_error)
            logging.error(msg)
            return

        sock.listen(connections)
        logging.info("Starting Server: {}:{}".format(host, port))

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