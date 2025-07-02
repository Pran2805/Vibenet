import { createLogger, format, transports } from "winston"
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports"
import { EApplicationEnvironment } from "../constant/application"
import config from "../config/config"
import util from "util"
import path from "path"
import "winston-mongodb"
// import * as sourceMapSupport from 'source-map-support'
import { red, blue, yellow, green, magenta } from "colorette"
import { MongoDBTransportInstance } from "winston-mongodb"

const colorizeLevel = (level: string) => {
    switch (level) {
        case "error":
            return red(level)
        case "info":
            return blue(level)
        case "warn":
            return yellow(level)
        default:
            return level
    }
}
// Linking Trace Support
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toLowerCase())
    const customTimestamp = green(timestamp as string)

    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta("META")} ${customMeta}\n`

    return customLog
})

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta as any)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ""
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const DBTransport = (): Array<MongoDBTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.MongoDB({
                level: "info",
                db: config.DATABASE_URL as string,
                metaKey: "meta",
                expireAfterSeconds: 30 * 24 * 60 * 60,
                collection: 'application-logs'
            })
        ]
    }
    return []
}
const FileTransport = (): Array<FileTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.File({
                filename: path.join(__dirname, "../", "../", "logs", `${config.ENV}.log`),
                level: "info",
                format: format.combine(format.timestamp(), fileLogFormat)
            })
        ]
    }
    return []
}

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: "info",
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [ ...FileTransport(),...DBTransport(), ...consoleTransport()]
})
