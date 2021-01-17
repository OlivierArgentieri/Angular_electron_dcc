import sys
sys.path.append("D:/Projet/PullGithub/Angular_electron_dcc") #todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)


import maya.standalone
maya.standalone.initialize()


from pipeline2.engines.servers.mayapy import MayapySocketServer
server = MayapySocketServer()
    
