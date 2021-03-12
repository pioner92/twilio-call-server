import SchemaDb, {ConfigSchemaType} from './config-schema-db';

type SaveDbType = (arg: ConfigSchemaType) => void

export const setConfigDb: SaveDbType = async ({name,fax, Account_Sid,Auth_Token,APP_SID,
                                               company_number,numbers_available,dispatcher_numbers,
                                               hidden_number}) => {
    const config = new SchemaDb({
        name,
        fax,
        Account_Sid,
        Auth_Token,
        APP_SID,
        company_number,
        hidden_number,
        numbers_available,
        dispatcher_numbers
    })
    await config.save()
}


