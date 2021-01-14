import { BaseModule } from "../base/baseModule";
const { spawn } = require('child_process');
export class LaunchDccModule extends BaseModule {

    launchDcc(_dccName){ // todo promise ?? 
        var _dcc = ""
        switch(_dccName){
            case "maya": _dcc = this.mainConfig.dccsBatch.maya;break;
            case "houdini": _dcc = this.mainConfig.dccsBatch.houdini;break;

            default:
                console.log("dcc NotFound ! ") 
                return false;
        
        }
        const _dccOBject = spawn(_dcc, [], {'shell': true, detached:true})

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