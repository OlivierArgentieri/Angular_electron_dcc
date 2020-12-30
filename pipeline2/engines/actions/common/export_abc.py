from engines.actions.common.base import base_action

class ExportAbc(base_action.BaseAction):
    @staticmethod
    def run(*args):
        print("from Export ABC")