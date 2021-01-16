import sys        
sys.path.append("D:/Projet/PullGithub/Angular_electron_dcc") #todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)


if('mayapy' in sys.executable):
    import maya.standalone
    maya.standalone.initialize()

    from pipeline2.engines.servers.maya import MayapySocketServer
    server = MayapySocketServer()
    
else:
    from pipeline2.engines.servers.maya import MayaSocketServer
    server = MayaSocketServer()

