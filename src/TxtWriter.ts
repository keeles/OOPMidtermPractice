import IWritable from "./Writable";
import { writeFile } from 'fs/promises';
import { Menu } from "./CSVMenuParser";
import { EOL } from "os";

export default class TxtWriter implements IWritable {
    private fileData: {[key: string]: Menu[]};

    constructor(fileData: {[key: string]: Menu[]}) {
        this.fileData = fileData
    }

    async writeMenu() {
        const menu = this.fileData._fileData
        let fileString = ""
        const meals = Object.keys(menu)
        for (const meal of meals) {
            fileString += `* ${meal} items *`
            //@ts-ignore
            for (const item of menu[meal]) {
                fileString += `${EOL}${item.price} ${item.name}, ${item.quantity}`
            }
            fileString += `${EOL}${EOL}`
        }
        await writeFile("./menus/menu.txt", fileString)
        console.log("New menu.txt")
    }
}