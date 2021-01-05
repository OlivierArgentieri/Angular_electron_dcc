import sys

import logging
import socket
import threading
import json
 
class SocketServer(object):

    def __init__(self):
        logging.basicConfig(level=logging.DEBUG)
        threading.Thread(target=main_server).start()


    def function_to_process(self, data, client):
        pass
    def process_update(self, data, client):
        pass

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
            msg = "Maya Server, Failed to open port: {}".format(socket_error)
            logging.error(msg)
            cmds.error(msg)
            return

        sock.listen(connections)
        logging.info("Starting Maya Server: {}".format(port))
        while True:
            client, address = sock.accept()
            data = client.recv(1024)
            if data:
                if data == "#Shutdown#":
                    break
                else:
                    logging.info("Socket Server, Data Received: {}".format(data))
                    process_update(data, client)

            try:
                client.close()
                print("close client")
            except Exception, client_error:
                logging.info("Socket Server, Error Closing Client Socket: {}".format(client_error))

        logging.info("Socket Server, Shutting Down.")
        try:
            sock.close()
        except Exception, close_error:
            logging.info("Socket Server, Error Closing Socket: {}".format(close_error))