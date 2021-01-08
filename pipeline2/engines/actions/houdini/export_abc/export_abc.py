from pipeline2.engines.actions.common.export_abc import ExportAbc


def run(*args, **kwargs):
    print("aaaaaaaa")


class HoudiniExportAbc(ExportAbc):
    @staticmethod
    def run(*args, **kwargs):

        print('test')
        return
        # from parameters