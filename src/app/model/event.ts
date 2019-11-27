import { Student } from "./student";
import { Style } from "./style";
import { Place } from "./place";

export class Event{
    _id: string;
    name: string;
    place: Place;
    about?:string;
    country?: string;
    city?: string;
    time: string;
    students: Student[];
    style: Style = new Style();
    toDate?: number;
    toDateFormated?: string;
    toTimeFormated?: string;
    fromDate?: number;
    fromDateFormated?: string;
    fromTimeFormated?: string;
}