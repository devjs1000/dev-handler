const struct = (status, msg, data) => ({ status, msg, data });

let mode = {
    debugMode: Boolean(process.env.PRODUCTION) || true
}


const handleThis = async ({ fn, msg, args = [], onSuccess, onFailed, expectedOnPass, expectedOnFailed, name, returnOnFailed, returnOnPass, type = 'fn', errorCode = 500, senders = {} }) => {
    let expected = expectedOnPass === undefined || expectedOnPass
    try {
        let response;
        if (args && args.length > 0) {
            response = await fn(...args)
        } else {
            response = await fn()
        }
        if (mode.debugMode) {
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
        if (mode.debugMode) {
            if (expected) {
                if (err.message === expectedOnFailed) {
                    console.log(`expected : ${name} failed with msg: ${msg} and error: ${err}`)
                } else {
                    console.log(`unexpected : ${name} failed with msg: ${msg} and error: ${err}`)
                }
                if (onFailed) onFailed({ err, status: false })
            }
            console.error(msg)
            console.log(err)
        }
        if (type === 'api') {
            senders.res.status(errorCode).send(struct(false, msg, err))
        }
        return returnOnFailed
    }
}

module.exports = handleThis