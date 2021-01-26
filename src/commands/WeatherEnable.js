class WeatherEnable {
    constructor(enable) {
        this.command = [0, 0, "simEnableWeather", [enable]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.WeatherEnable = WeatherEnable