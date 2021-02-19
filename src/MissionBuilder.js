const { EnableApiControl } = require('./commands/EnableApiControl')
const { ArmDisarm } = require('./commands/ArmDisarm')
const { TakeOff } = require('./commands/TakeOff')
const { Hover } = require('./commands/Hover')
const { Land } = require('./commands/Land')
const { MoveToPosition } = require('./commands/MoveToPosition')
const { MoveByVelocity } = require('./commands/MoveByVelocity')
const { RotateToYaw } = require('./commands/RotateToYaw')
const { GetImages } = require('./commands/GetImages')
const { WeatherEnable } = require('./commands/WeatherEnable')
const { WeatherSet } = require('./commands/WeatherSet')
const { RotateByYawRate } = require('./commands/RotateByYawRate')
const { CameraPose } = require('./commands/CameraPose')

class MissionBuilder {

    constructor(missionString, isDroneFlying) {
        this.missionString = missionString
        this.missionArray = []
        this.isDroneFlying = isDroneFlying
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

        // Enable API control if drone is on the ground
        //if (!this.isDroneFlying)
        commandList.push(new EnableApiControl(true))

        // Loop through the mission array and build the list of commands
        for (let i = 0; i < this.missionArray.length; i++) {
            
            const command = this.missionArray[i]

            // Block ID is decoded because some blocks have | in them which causes problems for tokenizing
            const blockId = decodeURIComponent(command.split(",")[1])
            
            if (command.indexOf("disarm") > -1) {

                commandList.push(new ArmDisarm(blockId, false))

            } else if (command.indexOf("arm") > -1) {

                commandList.push(new ArmDisarm(blockId, true))

            } else if (command.indexOf("takeoff") > -1) {

                commandList.push(new TakeOff(blockId))

            } else if (command.indexOf("hover") > -1) {

                let delay = command.split(",")[2]
                commandList.push(new Hover(blockId, delay))

            } else if (command.indexOf("fly_x") > -1) {

                let vx = command.split(",")[2]
                let duration = command.split(",")[3]
                commandList.push(new MoveByVelocity(blockId, vx, 0, 0, duration))

            } else if (command.indexOf("fly_y") > -1) {

                let vy = command.split(",")[2]
                let duration = command.split(",")[3]
                commandList.push(new MoveByVelocity(blockId, 0, vy, 0, duration))

            } else if (command.indexOf("fly_z") > -1) {

                let vz = command.split(",")[2]
                let duration = command.split(",")[3]
                commandList.push(new MoveByVelocity(blockId, 0, 0, vz, duration))

            } else if (command.indexOf("fly_to_location") > -1) {

                let northx = command.split(",")[1]
                let easty = command.split(",")[2]
                let downz = command.split(",")[3]

                // Todo we need to expose velocity in the blocks
                commandList.push(new MoveToPosition(northx, easty, downz, 5).getCommand())

            } else if (command.indexOf("fly_rpy") > -1) {

                let roll = command.split(",")[1]
                let pitch = command.split(",")[2]
                let yaw = command.split(",")[3]

                // NEED TO IMPLEMENT
                // commandList.push()

            } else if (command.indexOf("rotate_to_yaw") > -1) {

                let yaw = command.split(",")[2]
                commandList.push(new RotateToYaw(blockId, yaw))

            } else if (command.indexOf("rotate_yaw_rate") > -1) {

                let rate = command.split(",")[1]
                let duration = command.split(",")[2]
                commandList.push(new RotateByYawRate(rate, duration).getCommand())

            } else if (command.indexOf("photo_interval") > -1) {

                let photos = parseInt(command.split(",")[1])
                let interval = command.split(",")[2]

                for (let i = 0; i < photos; i++) {
                    commandList.push(new GetImages().getCommand())
                    commandList.push(new Hover(interval).getCommand())
                }
            
            } else if (command.indexOf("photo") > -1) {

                commandList.push(new GetImages().getCommand())

            } else if (command.indexOf("pitch_gimbal") > -1) {

                let pitch = parseFloat(command.split(",")[1])
                commandList.push(new CameraPose(pitch).getCommand())
            
            } else if (command.indexOf("weather_enable") > -1) {

                let enable = command.split(",")[1] == "true"
                commandList.push(new WeatherEnable(enable).getCommand())

            } else if (command.indexOf("weather_set") > -1) {

                let weather_type = command.split(",")[1]
                let weather_intensity = command.split(",")[2]
                commandList.push(new WeatherSet(weather_type, weather_intensity).getCommand())

            } else if (command.indexOf("land") > -1) {
                commandList.push(new Land(blockId))
            }

        }

        return commandList
    }
}
module.exports.MissionBuilder = MissionBuilder