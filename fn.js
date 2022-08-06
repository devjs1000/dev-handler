const struct = (status, msg, data) => ({ status, msg, data });

let production = process.env.PRODUCTION;

const debugMode = typeof production == 'string' ? JSON.parse(production) : true;

const handleThis = async ({ log = false, fn, errMsg, onSuccess, onFailed, expectedOnPass, expectedOnFailed, name, returnOnFailed, returnOnPass }) => {
    let expected = expectedOnPass === undefined || expectedOnPass
    try {
        let response = await fn()
        if (debugMode || log) {
            if (expected) {
                if (response === expectedOnPass) {
                    console.log(`expected : ${name} passed with response: ${response}`)
                } else {
                    console.log(`unexpected : ${name} passed with response: ${response}`)
                }
                if (onSuccess) onSuccess({ status: true })
            }
        }
        return returnOnPass
    } catch (err) {
        if (debugMode || log) {
            if (expected) {
                if (err.message === expectedOnFailed) {
                    console.log(`expected : ${name} failed with msg: ${errMsg} and error: ${err}`)
                } else {
                    console.log(`unexpected : ${name} failed with msg: ${errMsg} and error: ${err}`)
                }
                if (onFailed) onFailed({ err, status: false })
            }
            console.error(errMsg)
            console.log(err)
        }
        return returnOnFailed
    }
}

module.exports = handleThis