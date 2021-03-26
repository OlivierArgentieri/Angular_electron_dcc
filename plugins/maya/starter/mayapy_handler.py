import maya.standalone
maya.standalone.initialize()

from mayapy_socketserver import MayapySocketServer
server = MayapySocketServer()
