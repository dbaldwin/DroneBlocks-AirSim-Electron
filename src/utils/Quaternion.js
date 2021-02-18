class Quaternion {
    constructor(pitch, roll, yaw) {
        this.pitch = pitch
        this.roll = roll
        this.yaw = yaw
    }

    getQuaternion() {
        const t0 = Math.cos(this.yaw * 0.5)
        const t1 = Math.sin(this.yaw * 0.5)
        const t2 = Math.cos(this.roll * 0.5)
        const t3 = Math.sin(this.roll * 0.5)
        const t4 = Math.cos(this.pitch * 0.5)
        const t5 = Math.sin(this.pitch * 0.5)

        const w_val = t0 * t2 * t4 + t1 * t3 * t5
        const x_val = t0 * t3 * t4 - t1 * t2 * t5
        const y_val = t0 * t2 * t5 + t1 * t3 * t4
        const z_val = t1 * t2 * t4 - t0 * t3 * t5

        const q = { "w_val": w_val, "x_val": x_val, "y_val": y_val, "z_val": z_val }

        console.log(q)

        return q
    }
}
module.exports.Quaternion = Quaternion

/*
From Python
def to_quaternion(pitch, roll, yaw):
    t0 = math.cos(yaw * 0.5)
    t1 = math.sin(yaw * 0.5)
    t2 = math.cos(roll * 0.5)
    t3 = math.sin(roll * 0.5)
    t4 = math.cos(pitch * 0.5)
    t5 = math.sin(pitch * 0.5)

    q = Quaternionr()
    q.w_val = t0 * t2 * t4 + t1 * t3 * t5 #w
    q.x_val = t0 * t3 * t4 - t1 * t2 * t5 #x
    q.y_val = t0 * t2 * t5 + t1 * t3 * t4 #y
    q.z_val = t1 * t2 * t4 - t0 * t3 * t5 #z
    return q
*/