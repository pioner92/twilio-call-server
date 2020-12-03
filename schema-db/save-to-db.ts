// @ts-ignore
import SchemaDb from './schema-db';
import {SchemaType} from "./schema-db";

type SaveDbType = (arg: SchemaType) => void

export const saveToDb: SaveDbType = async ({name, date, from, to, status, duration,dataArr}) => {
    const data = new SchemaDb({
        name,
        date,
        from,
        to,
        status,
        duration,
        dataArr
    })
    await data.save()
}

