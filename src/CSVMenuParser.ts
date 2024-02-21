import IWritable from "./Writable";
import { readFile } from 'fs/promises';
import { EOL } from 'os'

export interface Menu {
    name: string, 
    price: string, 
    quantity: string
}

export class CSVMenuParser {
    private _fileData: {[key: string]: Menu[]};

    private constructor(fileData: {[key: string]: Menu[]}) {
        this._fileData = fileData
    }

    static async readMenu(fileName: string): Promise<any> {
        const fileData = await readFile(fileName, "utf8")
        let data = fileData.split(EOL).map((line) => line.split(","));

        const obj: {[key: string]: Menu[]} = {}
        for (const array of data) {
            let key = array[0]
            if (Object.keys(obj).includes(key)) {
                const innerObj = {
                    name: array[1], 
                    price: array[3], 
                    quantity: array[2]
                }
                obj[key].push(innerObj)
            } else {
                obj[key] = [];
                const innerObj = {
                    name: array[1], 
                    price: array[3], 
                    quantity: array[2]
                }
                obj[key].push(innerObj)
            }
        }
        return new CSVMenuParser(obj)
    }
 
    public async writeMenu(writer: IWritable) {
        writer.writeMenu(this._fileData)
    }
}

