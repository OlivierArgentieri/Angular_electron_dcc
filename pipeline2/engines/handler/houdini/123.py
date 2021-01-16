import sys
      
sys.path.append("D:/Projet/PullGithub/Angular_electron_dcc") # todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)

from pipeline2.engines.servers.houdini import HoudiniSocketServer
server = HoudiniSocketServer()

print("Pipeline 2 OK ! ")