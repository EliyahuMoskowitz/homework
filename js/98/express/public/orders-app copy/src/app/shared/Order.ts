import { Item } from "./Item";
import { Person } from "./Person";

export interface Order {
    person: Person,
    date: Date,
    items: Item[]
}