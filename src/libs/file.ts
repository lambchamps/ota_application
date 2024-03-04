import { promises as fsPromises } from 'fs'
import Logger from './../libs/logger';
import * as path from 'path'

const notesDir = path.join(__dirname, 'destinationFolder');
const readFile = async () => {
    try {

        Logger.info(notesDir)
        const dirContents = await fsPromises.readdir(__dirname)
        Logger.info(dirContents)
    } catch (error) {
        Logger.error(`Error: ${error}`)
    }
}

export default readFile