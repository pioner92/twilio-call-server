const {Schema,model,Types} = require('mongoose')

export type ConfigSchemaType = {
    name:string,
    fax:string
    Account_Sid:string
    Auth_Token:string
    APP_SID:string
    company_number:string
    hidden_number:string
    dispatcher_numbers:Array<string>
    numbers_available:Array<string>
}

const schema = new Schema({
    name:{type:String,required:true},
    fax:{type:String,required:true},
    Account_Sid:{type:String,required:true},
    Auth_Token:{type:String,required:true},
    APP_SID:{type:String,required:true},
    company_number:{type: String,required:true},
    dispatcher_numbers:{type:Array,required:true},
    numbers_available:{type:Array,required:true}
})

export default model("config" , schema);
