class WeatherEnable {
    constructor(id, enable) {
        this.id = id
        this.command = [0, 0, "simEnableWeather", [enable]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.WeatherEnable = WeatherEnable