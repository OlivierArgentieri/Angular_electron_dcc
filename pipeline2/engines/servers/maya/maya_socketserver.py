from engines.servers.base.base_socketserver import BaseSocketServer


import maya.cmds as cmds
import maya.utils as maya_utils

HOST = "localhost"
PORT = 12346
CONNECTIONS = 1

class MayaSocketServer(BaseSocketServer):

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


    if __name__ == "__main__":
        logging.basicConfig(level=logging.DEBUG)
        threading.Thread(target=main_server).start()