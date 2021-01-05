import sys

import logging
import socket
import threading
import json

"""
Default value  
"""
HOST = "192.168.1.15"
PORT = 12346
CONNECTIONS = 1


class BaseSocketServer(object):

   
    def __init__(self):
        self.serverRunning = True
        logging.basicConfig(level=logging.DEBUG)
        # TODO : Need to find available port by dccs type

        
    #======================
    # --- Override Part ---
    #======================
    def function_to_process(self, data, client):
        logging.error("function_to_process not implemented")
        
    def process_update(self, data, client):
        logging.error("process_update not implemented")

    def on_shutdown(self):
        self.serverRunning = False

    def on_identify_dcc(self, client):
        client.send("Idendity not implemented")
    #===========================
    # --- End Override Part ---
    #===========================


    def main_server(self, host=HOST, port=PORT, connections=CONNECTIONS):
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