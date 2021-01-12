import { BaseModule } from "../base/baseModule";
const { spawn } = require('child_process');
export class LaunchDccModule extends BaseModule {

    launchDcc(_dccName){
        console.log("test")

        const cmd = spawn(this.mainConfig.dccsBatch.houdini, [], {'shell': true, detached: true})

        cmd.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });
          
        cmd.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
          });
          
        cmd.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
          });
    }
}