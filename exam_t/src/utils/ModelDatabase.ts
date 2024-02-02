import { Event } from "../models/Event";
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDatabaseConnection = async () => {
    return openDatabase({ name: 'events.db', location: 'default' });
}

export const createTable = async (db: SQLiteDatabase | undefined) => {
    const query = `CREATE TABLE IF NOT EXISTS EVENTS
                   (
                       id INTEGER PRIMARY KEY,
                       name TEXT NOT NULL,
                       team TEXT,
                       details TEXT NOT NULL,
                       status TEXT,
                       participants INTEGER,
                       type TEXT
                   );`;
    await db.executeSql(query);
}

export const getEventsFromDb = async (db: SQLiteDatabase | null): Promise<Event[]> => {
    try {
        const events: Event[] = [];
        const result = await db.executeSql('SELECT * FROM EVENTS;');
        for (let i = 0; i < result[0].rows.length; i++) {
            events.push(result[0].rows.item(i));
        }
        return events;
    } catch (e) {
        console.log(e);
        throw Error('Failed to get events from the database!');
    }
}

export const addEventToDatabase = async (db: SQLiteDatabase | null, event: Event) => {
    const query = `INSERT INTO EVENTS(id, name, team, details, status, participants, type)
                   VALUES ('${event.id}', '${event.name}', '${event.team}', '${event.details}', '${event.status}', '${event.participants}', '${event.type}');`;

    await db.executeSql(query);
}

export const getModelsByDate = async (db: SQLiteDatabase | null, date: string): Promise<Event[]> => {
    try {
        const models: Event[] = [];
        const result = await db.executeSql(`SELECT * FROM ACTIVITIES WHERE date = '${date}';`);

        for (let i = 0; i < result[0].rows.length; i++) {
            models.push(result[0].rows.item(i));
        }

        return models;
    } catch (e) {
        console.log(e);
        throw Error('Failed to get models from the database!');
    }
}

export const getEventById = async (db: SQLiteDatabase | null, id: number): Promise<Event> => {
    try {
        let model: Event;
        const result = await db.executeSql(`SELECT * FROM EVENTS WHERE id = ${id};`);

        for (let i = 0; i < result[0].rows.length; i++) {
            model = (result[0].rows.item(i));
        }

        return model;
    } catch (e) {
        console.log(e);
        throw Error('Failed to get events from the database!');
    }
}


export const updateModelInDatabase = async (db: SQLiteDatabase | null, model: Event) => {
    const query = `UPDATE ACTIVITIES
                   SET date='${model.date}',
                       type='${model.type}',
                       duration=${model.duration},
                       calories=${model.calories},
                       category='${model.category}',
                       description='${model.description}'
                   WHERE id = ${model.id};
    `;
    await db.executeSql(query);
}

export const deleteModelFromDatabase = async (db: SQLiteDatabase | null, id: number) => {
    const query = `DELETE FROM ACTIVITIES WHERE id = ${id};`;
    await db.executeSql(query);
}
