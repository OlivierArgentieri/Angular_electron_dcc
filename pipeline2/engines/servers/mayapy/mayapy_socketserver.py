from pipeline2.engines.servers.base.base_socketserver import BaseSocketServer

import maya.cmds as cmds
import maya.utils as maya_utils

import sys
import logging
import socket
import threading
import json


class MayaSocketServer(BaseSocketServer):

    def __init__(self):
        super(MayaSocketServer, self).__init__()
        logging.basicConfig(level=logging.DEBUG)
        
        self.start_with_config()
    
    def start_with_config(self):
        config = self.get_config()

        port_start = config.get('dccPortSettings', {}).get('mayaPortRangeStart', 0)
        port_end = config.get('dccPortSettings', {}).get('mayaPortRangeEnd', 0)
        
        sys.path.append(config.get('pipelineSettings', {}).get('mayapyActionsPath', 0)) # add houdini action in sys path 
        self.start_server(port_start, port_end, self.CONNECTIONS)

    def function_to_process(self, data, client):
        """
        Maya function
        :param data: incoming data to process
        :return:
        """

        logging.info("Mayapy Server, Process Function: {}".format(data))

        out = ""
        if("print" in data):
            data = data.replace("print", "out = str")

        try:
            cmds.headsUpMessage("Processing incoming data: {}".format(data), time=3.0)
            exec(data)
            client.send(out)
        except Exception, exec_error:
            client.send(str(exec_error))

    def process_update(self, data, client):
        """
        Process incoming data, run this in the Maya main thread
        :param data:
        :return:
        """

        try:
            self.function_to_process(data, client)
        except Exception, e:
            cmds.error("Mayapy Server, Exception processing Function: {}".format(e))
    
    def on_identify_dcc(self, client):
        data = "name = cmds.file(q=True, sn=True).split('/')[-1]\nname = name if len(name)>0 else 'unsaved'\nprint(name)"
        self.function_to_process(data, client)