const { EnableApiControl } = require('./commands/EnableApiControl')
const { ArmDisarm } = require('./commands/ArmDisarm')
const { TakeOff } = require('./commands/TakeOff')
const { Hover } = require('./commands/Hover')
const { Land } = require('./commands/Land')
const { MoveToPosition } = require('./commands/MoveToPosition')
const { MoveByVelocity } = require('./commands/MoveByVelocity')
const { WeatherEnable } = require('./commands/WeatherEnable')
const { WeatherSet } = require('./commands/WeatherSet')

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

                let delay = command.split(",")[1]
                commandList.push(new Hover(delay).getCommand())

            } else if (command.indexOf("fly_x") > -1) {

                let vx = command.split(",")[1]
                let duration = command.split(",")[2]
                commandList.push(new MoveByVelocity(vx, 0, 0, duration).getCommand())

            } else if (command.indexOf("fly_y") > -1) {

                let vy = command.split(",")[1]
                let duration = command.split(",")[2]
                commandList.push(new MoveByVelocity(0, vy, 0, duration).getCommand())

            } else if (command.indexOf("fly_z") > -1) {

                let vz = command.split(",")[1]
                let duration = command.split(",")[2]
                commandList.push(new MoveByVelocity(0, 0, vz, duration).getCommand())

            } else if (command.indexOf("fly_to_location") > -1) {

                let northx = command.split(",")[1]
                let easty = command.split(",")[2]
                let downz = command.split(",")[3]

                // Todo we need to expose velocity in the blocks
                commandList.push(new MoveToPosition(northx, easty, downz, 5).getCommand())

            } else if (command.indexOf("weather_enable") > -1) {

                let enable = command.split(",")[1] == "true"
                commandList.push(new WeatherEnable(enable).getCommand())

            } else if (command.indexOf("weather_set") > -1) {

                let weather_type = command.split(",")[1]
                let weather_intensity = command.split(",")[2]
                commandList.push(new WeatherSet(weather_type, weather_intensity).getCommand())

            } else if (command.indexOf("land") > -1) {
                commandList.push(new Land().getCommand())
            }

        }

        return commandList
    }
}
module.exports.MissionBuilder = MissionBuilder