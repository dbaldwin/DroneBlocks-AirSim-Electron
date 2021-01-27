const { EnableApiControl } = require('./commands/EnableApiControl')
const { ArmDisarm } = require('./commands/ArmDisarm')
const { TakeOff } = require('./commands/TakeOff')
const { Hover } = require('./commands/Hover')
const { Land } = require('./commands/Land')

class MissionBuilder {

    constructor(missionString) {
        this.missionString = missionString
        this.missionArray = []
    }

    parseMission() {

        // For single block scenario it may be necessary to remove the leading pipe
        if (this.missionString.indexOf("|") == 0) {
            this.missionString = this.missionString.replace("|")
        }

        // Mission string is now an array
        this.missionArray = this.missionString.split("|")

        // Create the array to store commands
        let commandList = []

        // Enable API control
        commandList.push(new EnableApiControl(true).getCommand())

        // Loop through the mission array and build the list of commands
        for (let i = 0; i < this.missionArray.length; i++) {
            
            const command = this.missionArray[i]
            
            if (command.indexOf("disarm") > -1) {
                commandList.push(new ArmDisarm(false).getCommand())
            } else if (command.indexOf("arm") > -1) {
                commandList.push(new ArmDisarm(true).getCommand())
            } else if (command.indexOf("takeoff") > -1) {
                commandList.push(new TakeOff().getCommand())
            } else if (command.indexOf("hover") > -1) {
                commandList.push(new Hover().getCommand())
            } else if (command.indexOf("land") > -1) {
                commandList.push(new Land().getCommand())
            }

        }

        return commandList
    }
}
module.exports.MissionBuilder = MissionBuilder