import { Student } from "./student";
import { DanceStyle } from "./dancestyle";

export class DanceClass{
    id: string;
    name: string;
    date: string;
    students: Student[];
    danceStyle: DanceStyle = new DanceStyle();
}