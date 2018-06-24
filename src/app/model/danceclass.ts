import { Student } from "./student";
import { DanceStyle } from "./dancestyle";

export class DanceClass{
    id: string;
    name: string;
    place: string;
    time: string;
    students: Student[];
    danceStyle: DanceStyle = new DanceStyle();
}