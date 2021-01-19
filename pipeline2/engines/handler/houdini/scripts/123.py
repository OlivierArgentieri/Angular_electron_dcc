import hou
import sys, os

path_to_append = ""
by_env = hou.getenv("HOUDINI_PATH")
if(by_env != None):
    path_to_append = by_env.split("pipeline2")[0]
    
by_path = sys.argv[0]
if(by_path != "" ):
    path_to_append = sys.argv[0].split("pipeline2")[0]

sys.path.append(path_to_append) # todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)

from pipeline2.engines.servers.houdini import HoudiniSocketServer
server = HoudiniSocketServer()

print("Pipeline 2 OK ! ")