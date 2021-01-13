from pipeline2.engines.servers.base.base_socketserver import BaseSocketServer

import hou
import sys

import logging
import socket
import threading
import json


class HoudiniSocketServer(BaseSocketServer):

    def __init__(self):
        super(HoudiniSocketServer, self).__init__()
        logging.basicConfig(level=logging.DEBUG)

        self.start_with_config()

    def start_with_config(self):    
        config = self.get_config()

        port_start = config.get('dccPortSettings', {}).get('houdiniPortRangeStart', 0)
        port_end = config.get('dccPortSettings', {}).get('houdiniPortRangeEnd', 0)

        sys.path.append(config.get('pipelineSettings', {}).get('houdiniActionsPath', 0)) # add houdini action in sys path 
        sys.path.append(config.get('pipelineSettings', {}).get('hythonActionsPath', 0)) # add hython action in sys path 
        self.start_server(port_start, port_end, self.CONNECTIONS)


    def function_to_process(self, data, client):
        """
        Function To Process, exec received data/cmd
        :param data: incoming data to process
        :return:
        """

        logging.info("Houdini Server, Process Function: {}".format(data))

        out = ""
        if("print" in data):
            data = data.replace("print", "out = str")

        try:
            exec(data)
            client.send(out)

        except hou.Error as e:
            client.send(str(e))
        except Exception as e:
            client.send(str(e))

    def process_update(self, data, client):
        """
        Process incoming data, to redirect exec on another thread for exemple
        :param data:
        :return:
        """
        
        try:
           
            #hdefereval.executeInMainThreadWithResult(self.function_to_process, data, client)
            self.function_to_process(data, client) # on main thread
        except Exception as e:
            client.send(e)
            logging.error("Houdini Server, Exception processing Function: {}".format(e))


    def on_identify_dcc(self, client):
        name = hou.hipFile.name() if hou.hipFile.name() != 'untitled.hip' else 'unsaved'
        exec_name = sys.executable
        
        data = json.dumps({'filename': name, 'exec_name': exec_name}, sort_keys=True, indent=4)
        
        client.send(data)

    