import sys, os        
#dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append("D:/Projet/PullGithub/Angular_electron_dcc") #todo

tmp_modules = sys.modules.copy()
for key, value in tmp_modules.iteritems():
    if key.startswith('pipeline2.'):
        sys.modules.pop(key, None)


from pipeline2.engines.servers.maya import MayaSocketServer
server = MayaSocketServer()