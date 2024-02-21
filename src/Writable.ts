import { Menu } from "./CSVMenuParser";

export default interface IWritable {
    writeMenu(data: {[key: string]: Menu[]}): void;
}