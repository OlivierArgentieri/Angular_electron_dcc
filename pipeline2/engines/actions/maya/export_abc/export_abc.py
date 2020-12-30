from engines.actions.common.export_abc import ExportAbc
import sys

class MayaExportAbc(ExportAbc):
    @staticmethod
    def run(*args):
        print(args[0])
        print(args[1])


