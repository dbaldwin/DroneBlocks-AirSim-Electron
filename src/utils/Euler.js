class Euler {
    constructor(quaternion) {
        this.x = quaternion.x_val
        this.y = quaternion.y_val
        this.z = quaternion.z_val
        this.w = quaternion.w_val
    }

    getEulerAngles() {
    //roll (x-axis rotation)
    //t0 = +2.0 * (w*x + y*z)
    //t1 = +1.0 - 2.0*(x*x + ysqr)
    //roll = math.atan2(t0, t1)

    //pitch (y-axis rotation)
    //t2 = +2.0 * (w*y - z*x)
    //if (t2 > 1.0):
    //    t2 = 1
    //if (t2 < -1.0):
    //    t2 = -1.0
    //pitch = math.asin(t2)

    //yaw (z-axis rotation)
    //t3 = +2.0 * (w*z + x*y)
    //t4 = +1.0 - 2.0 * (ysqr + z*z)
    //yaw = math.atan2(t3, t4)

    //return (pitch, roll, yaw)
    }

    getYawAngle() {
        // yaw (z-axis rotation)
        let ysquared = this.y * this.y
        let t3 = +2.0 * (this.w * this.z + this.x * this.y)
        let t4 = +1.0 - 2.0 * (ysquared + this.z * this.z)
        let yaw = Math.atan2(t3, t4)
        
        return yaw * (180/Math.PI)
    }
}
module.exports.Euler = Euler