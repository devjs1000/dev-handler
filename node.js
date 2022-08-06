require('dotenv').config()
const fs = require('fs')

const struct = (status, msg, data) => ({ status, msg, data });

let production = process.env.PRODUCTION;

const debugMode = typeof production == 'string' ? JSON.parse(production) : true;

const handleThis = async ({ fn, errMsg, args = [], onSuccess, onFailed, expectedOnPass, expectedOnFailed, name, returnOnFailed, returnOnPass, type = 'fn', errorCode = 500, senders = {}, recording = true, }) => {
    let expected = expectedOnPass === undefined || expectedOnPass
    try {
        let response;
        if (args && args.length > 0) {
            response = await fn(...args)
        } else {
            response = await fn()
        }
        if (debugMode) {
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
        if (debugMode) {
            if (expected) {
                if (err.message === expectedOnFailed) {
                    console.log(`expected : ${name} failed with msg: ${errMsg} and error: ${err}`)
                } else {
                    console.log(`unexpected : ${name} failed with msg: ${errMsg} and error: ${err}`)
                }
                if (onFailed) onFailed({ err, status: false })
            }
            console.error(msg)
            console.log(err)
            fs.appendFileSync('error.log', `date : ${new Date().toLocaleDateString()} | time: ${new Date().toLocaleTimeString()} | ${name} failed with msg: ${errMsg} and error: ${err} `)
        }
        if (type === 'api') {
            senders.res.status(errorCode).send(struct(false, msg, err))
        }
        return returnOnFailed
    }
}

module.exports = handleThis