from pipeline2.engines.servers.base.base_socketserver_py3 import BaseSocketServer

import sys

import logging
import socket
import threading, queue
import json
import time
import bpy 
import functools

q = queue.Queue()
##########################################################
# class server for blender. inherit BaseSocketServer class
##########################################################
class BlenderSocketServer(BaseSocketServer):

    def __init__(self):
        super(BlenderSocketServer, self).__init__()
        logging.basicConfig(level=logging.DEBUG)

        self.start_with_config()

    def start_with_config(self):
        """!
        To configure server before call startServer, depend on which dcc used
        """    
        config = self.get_config()

        port_start = config.get('dccPortSettings', {}).get('houdiniPortRangeStart', 0)
        port_end = config.get('dccPortSettings', {}).get('houdiniPortRangeEnd', 0)

        sys.path.append(config.get('pipelineSettings', {}).get('houdiniActionsPath', 0)) # add houdini action in sys path 
        self.start_server(port_start, port_end, self.CONNECTIONS)


    def function_to_process(self, data, client):
        """!
        Function to execute, received command (callback)
        @param data Json: Received Data
        @param client SocketClient: Client Connection
        """

        logging.info("Houdini Server, Process Function: {}".format(data))

        global_scope = {}
        local_scope = {}
        
        if("print" in data):
            data = data.replace("print", "out = str")
            print(data)

        try:
            exec(data, global_scope, local_scope)

            if("mesh" in data):
                time.sleep(1)
            out = local_scope.get('out', '')
            print("out : {}".format(out))
            client.send(out.encode('utf-8'))

        except Exception as e:
             print(str(e) + "L53")
             client.send(str(e).encode('utf-8'))

    def process_update(self, data, client):
        """!
        Redirect execution of data received (onMainThread for maya, for example)
        @param data Json: Received Data
        @param client SocketClient: Client Connection
        """

        try:
            print(data)
            bpy.app.handlers.frame_change_pre.append(self.function_to_process(data, client))
            
            #threading.Thread(target=self.function_to_process, args=(data, client)).start()
            # add to queu here 
            # on main thread
        except Exception as e:
            print(str(e) + "L65")
            #client.send(str(e).encode('utf-8'))
            logging.error("Blender Server, Exception processing Function: {}".format(e))


    def on_identify_dcc(self, client):
        """!
        On Identify Dcc Action [Need to be override per dcc]
        @param client SocketClient: Client Connection
        """

        name =  'unsaved'
        exec_name = sys.executable
        #   exec_name = exec_name.split('.')[0]
        data = json.dumps({'filename': name, 'exec_name': exec_name}, sort_keys=True, indent=4)
        #data =  name
        
        client.send(data.encode())

    def on_shutdown(self):
        """!
        On Shutdown Action
        """
        self.serverRunning = False



#read queue
