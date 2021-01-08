from pipeline2.engines.actions.common.export_abc import ExportAbc
import sys
import maya.cmds as cmds

def run(*args, **kwargs):

    # from parameters
    exportFileName = kwargs.get('outPath', '')
    frameStart =  kwargs.get('startFrame',0)
    frameEnd = kwargs.get('endFrame',0)
    rootObjects = kwargs.get('objects','').split(" ") #a b c d 
    for rootObject in rootObjects:
        command = "-frameRange " + str(frameStart) + " " + str(frameEnd) +" -uvWrite -dataFormat ogawa -root " + rootObject + " -file " + exportFileName +"/"+rootObject+".abc "
        cmds.AbcExport ( j = command )
    print("done")

