import ConfigSchemaDb, {ConfigSchemaType} from './config-schema-db'


export class GetCompanyDataFromDb {
    static schema = ConfigSchemaDb

    static async byName(name: string): Promise<ConfigSchemaType | undefined> {
        return this.schema.findOne({name})
    }

    static async byNumber(number: string): Promise<ConfigSchemaType | undefined> {
        return this.schema.findOne({numbers_available: {$in: [number]}}, (err: never, data: Document) => {
        }).limit(1)
    }

}

export class SetCompanyDataInDb extends GetCompanyDataFromDb {

    static async deleteNumber(name: string, number: string) {
        this.schema.findOneAndUpdate({name},{$pullAll:{numbers_available:[number],dispatcher_numbers:[number]}},(er:never,data:Document)=>{
        })
    }

    static async addNumber(name: string, number: string) {
        this.schema.findOneAndUpdate({name},{$push:{numbers_available:number,dispatcher_numbers:number}},(er:never,data:Document)=>{
        })
    }
}
