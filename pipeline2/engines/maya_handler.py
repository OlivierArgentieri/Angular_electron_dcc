"""
Maya Threaded Server
Run this in Maya
"""

import logging
import socket
import threading
import json 

import maya.cmds as cmds
import maya.utils as maya_utils

HOST = "localhost"
PORT = 12346
CONNECTIONS = 1


def function_to_process(data, client):
    """
    Maya function
    :param data: incoming data to process
    :return:
    """

    logging.info("Maya Server, Process Function: {}".format(data))
    
    out = ""
    if("print" in data):
        data = data.replace("print", "out = str")
    
    try:
        cmds.headsUpMessage("Processing incoming data: {}".format(data), time=3.0)
        
        print("ssss")
        exec(data)
        client.send(out)
    except Exception, exec_error:
        #cmds.error("Maya Server, Exception processing Function: {}".format(exec_error))
        client.send(str(exec_error))

def process_update(data, client):
    """
    Process incoming data, run this in the Maya main thread
    :param data:
    :return:
    """

    try:
        maya_utils.executeInMainThreadWithResult(function_to_process, data, client)
    except Exception, e:
        cmds.error("Maya Server, Exception processing Function: {}".format(e))
        

def maya_server(host=HOST, port=PORT, connections=CONNECTIONS):
    """
    Maya server
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
                logging.info("Maya Server, Data Received: {}".format(data))
                process_update(data, client)
               
        try:
            client.close()
            print("close client")
        except Exception, client_error:
            logging.info("Maya Server, Error Closing Client Socket: {}".format(client_error))

    logging.info("Maya Server, Shutting Down.")
    try:
        sock.close()
    except Exception, close_error:
        logging.info("Maya Server, Error Closing Socket: {}".format(close_error))


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    threading.Thread(target=maya_server).start()



#########################
# for include all actions 
#########################
#import sys        
#sys.path.append("D:/Projet/PullGithub/Angular_electron_dcc/pipeline2")
#from engines.actions import *


# test
#MayaExportAbc.run(1,1)