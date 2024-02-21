import IWritable from "./Writable";
import { Menu } from "./CSVMenuParser";
import { writeFile } from "fs/promises";
import { EOL } from "os";

export default class HTMLWriter implements IWritable {
    fileData: {[key: string]: Menu[]};

    constructor(fileData: {[key: string]: Menu[]}) {
        this.fileData = fileData
    }

    async writeMenu() {
        const menu = this.fileData._fileData
        let fileString = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Menu</title>
            </head>
            <body>
            <table>
            `
        const meals = Object.keys(menu)
        for (const meal of meals) {
            fileString += `<thead><tr><th scope="row" colspan="3">${meal} items</th></tr></thead><tbody>`
            //@ts-ignore
            for (const item of menu[meal]) {
                fileString += `${EOL}<tr><th>${item.price}</th><th>${item.name}</th><th>${item.quantity}</th></tr>`
            }
            fileString += `</tbody>`
        }
        fileString += `
            </table>
            </body>
            </html>
            `
        await writeFile("./menus/menu.html", fileString)
        console.log("New menu.html")    
    }
}
