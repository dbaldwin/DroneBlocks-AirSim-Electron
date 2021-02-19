class WeatherSet {
    /*
        weatherType: rain=0, snow=2, leaves=4, dust=6, fog=7
        intensity: range from 0 - 1
    */
    constructor(id, weatherType, intensity) {
        this.id = id
        this.command = [0, 0, "simSetWeatherParameter", [parseInt(weatherType), parseFloat(intensity)]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.WeatherSet = WeatherSet