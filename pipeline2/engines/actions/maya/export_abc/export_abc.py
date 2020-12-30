from engines.actions.common.export_abc import ExportAbc
import sys
import maya.cmds as cmds

class MayaExportAbc(ExportAbc):
    @staticmethod
    def run(*args):

        # from parameters
        exportFileName = args[0]
        frameStart = args[1]
        frameEnd = args[2]
        rootObjects = args[3].split(" ") #a b c d 

        for rootObject in rootObjects:
            command = "-frameRange " + frameStart + " " + frameEnd +" -uvWrite -dataFormat ogawa -root " + rootObject + " -file " + exportFileName +"/"+rootObject+".abc "
            cmds.AbcExport ( j = command )
        print("done")
