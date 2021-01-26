class WeatherSet {
    /*
        weatherType: rain=0, snow=2, leaves=4, dust=6, fog=7
        intensity: range from 0 - 1
    */
    constructor(weatherType, intensity) {
        this.command = [0, 0, "simSetWeatherParameter", [weatherType, intensity]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.WeatherSet = WeatherSet