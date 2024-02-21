import {CSVMenuParser} from "./CSVMenuParser";
import HTMLWriter from "./HTMLWriter";
import TxtWriter from "./TxtWriter";

async function main() {
    const newMenu = await CSVMenuParser.readMenu("./menu.csv")   
    const newHTML = new HTMLWriter(newMenu)
    const newTXT = new TxtWriter(newMenu)
    const menu = await newMenu.writeMenu(newTXT)
    const html = await newMenu.writeMenu(newHTML)
    }

main();