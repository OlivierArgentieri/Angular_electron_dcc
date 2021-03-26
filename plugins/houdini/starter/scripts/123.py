import sys

if('houdini' in sys.executable):
    from houdini_socketserver import HoudiniSocketServer
    server = HoudiniSocketServer()
    print("Plugins OK ! ")

else:
    from hython_socketserver import HythonSocketServer
    server = HythonSocketServer()
    print("Plugins 2 OK ! ")