from pipeline2.engines.actions.common.export_abc import ExportAbc

class HoudiniExportAbc(ExportAbc):
    @staticmethod
    def run(*args, **kwargs):

        print('test')
        return
        # from parameters
        exportFileName = kwargs.get('outPath', '')
        frameStart =  kwargs.get('startFrame',0)
        frameEnd = kwargs.get('endFrame',0)
        rootObjects = kwargs.get('objects','').split(" ") #a b c d 

        for rootObject in rootObjects:
            command = "-frameRange " + str(frameStart) + " " + str(frameEnd) +" -uvWrite -dataFormat ogawa -root " + rootObject + " -file " + exportFileName +"/"+rootObject+".abc "
            
        print("done")