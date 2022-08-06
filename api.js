const struct = (status, msg, data) => ({ status, msg, data });

let production = process.env.PRODUCTION;

const debugMode = typeof production == 'string' ? JSON.parse(production) : true;

const handleThis = async ({ log = false, fn, errMsg, successMsg, req, bodyKeys, paramsKeys, queryKeys, res }) => {
    try {
        let response = await fn()
        let msg = `${req.method}:// date: ${new Date().toLocaleDateString()} | time: ${new Date().toLocaleTimeString()} | success: ${successMsg} | response: ${response}`
        let datas = ['body', 'params', 'query']
        let params = { body: bodyKeys, params: paramsKeys, query: queryKeys }
        for (let method of datas) {
            let arr = params[method]
            for (let i of arr) {
                if (req[method][i] == undefined) {
                    throw new Error({ dev: `${i} is undefined in req.${method}`, user: `please  provide ${i}` })
                }
            }
        }
        msg += ` | body: ok | params: ok | query: ok | ip: ${req.ip} | `
        if (debugMode || log) {
            console.log(msg)
        }
    } catch (err) {
        if (debugMode || log) {
            console.error(err.dev)
            console.log(err)
        }
        res.send(struct(false, errMsg || err.user, err))
    }
}

module.exports = handleThis