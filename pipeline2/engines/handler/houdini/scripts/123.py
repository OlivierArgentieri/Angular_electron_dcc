import hou
import sys, os

path_to_append = ""
by_env = hou.getenv("HOUDINI_PATH")
if(by_env != None):
    path_to_append = by_env.split("pipeline2")[0]

sys.path.append(path_to_append) # todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)

if('houdini' in sys.executable):
    from pipeline2.engines.handler.houdini.scripts import houdini_handler
else:
    from pipeline2.engines.handler.houdini.scripts import hython_handler