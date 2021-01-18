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
        
        sys.path.append(config.get('pipelineSettings', {}).get('mayaActionsPath', 0)) # add houdini action in sys path 
        self.start_server(port_start, port_end, self.CONNECTIONS)

    def function_to_process(self, data, client):
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
            exec(data)
            logging.info("Maya Server out: {}".format(out))
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
            maya_utils.executeInMainThreadWithResult(self.function_to_process, data, client)
        except Exception, e:
            cmds.error("Maya Server, Exception processing Function: {}".format(e))
    
    def on_identify_dcc(self, client):
        exec_name = sys.executable.rsplit('\\',1)[1]
        exec_name = exec_name.split('.')[0]

        data ="name = cmds.file(q=True, sn=True).split('/')[-1]\nname = name if len(name)>0 else 'unsaved'\nprint(json.dumps({'filename': name, 'exec_name': '" + exec_name + "'}, sort_keys=True, indent=4))"
        maya_utils.executeInMainThreadWithResult(self.function_to_process, data, client)

    def on_shutdown(self):
        """!
        On Shutdown Action
        """
        self.serverRunning = False
        sys.exit()