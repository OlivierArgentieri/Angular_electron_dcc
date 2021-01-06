from pipeline2.engines.servers.base.base_socketserver import BaseSocketServer



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
        dcc_port_settings = config['dccPortSettings']
        port_start = dcc_port_settings['houdiniPortRangeStart']
        port_end = dcc_port_settings['houdiniPortRangeEnd']

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
        except Exception, exec_error:
            client.send(str(exec_error))

    def process_update(self, data, client):
        """
        Process incoming data, to redirect exec on another thread for exemple
        :param data:
        :return:
        """
        
        try:
            self.function_to_process(data, client) # on main thread
        except Exception, e:
            logging.error("Houdini Server, Exception processing Function: {}".format(e))


    def on_identify_dcc(self, client):
        client.send("houdiniFile")

    