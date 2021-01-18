import { BaseModule } from "../base/baseModule";
import { SettingsModule } from "../settingsModule/settingsModule";
const { spawn } = require('child_process');
export class LaunchDccModule extends BaseModule {

  constructor() {
    super();
  }
  launchDcc(_dccName) { // todo promise !!

    var _dcc = "";
    var _cmd: string = "";
    switch (_dccName) {
      case "maya": _dcc = SettingsModule.parsedConfig.dccsPath.maya; break;
      case "houdini": _dcc = SettingsModule.parsedConfig.dccsPath.houdini; break;
      case "hython": 
        _dcc = SettingsModule.parsedConfig.dccsPath.hython;
        _cmd = SettingsModule.parsedConfig.pipelineSettings.hythonHandlerPath;
        break;
      case "mayapy":
        _dcc = SettingsModule.parsedConfig.dccsPath.mayapy;
        _cmd = SettingsModule.parsedConfig.pipelineSettings.mayapyHandlerPath;
        break;

      default:
        console.log("dcc NotFound ! ")
        return false;

    }
    console.log(`CMD : ${_cmd}`)
    const _dccOBject = spawn(_dcc, [_cmd], { 'shell': true, detached: true })

    _dccOBject.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    _dccOBject.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
    });

    _dccOBject.on('exit', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
}