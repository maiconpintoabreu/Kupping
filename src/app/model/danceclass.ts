import { Student } from "./student";
import { DanceStyle } from "./dancestyle";
import { Place } from "./place";

export class DanceClass{
    id: string;
    name: string;
    place: Place;
    time: string;
    students: Student[];
    danceStyle: DanceStyle = new DanceStyle();
}