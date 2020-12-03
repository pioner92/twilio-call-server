const {Schema,model,Types} = require('mongoose')

export type SchemaType = {
    name:string
    date:string
    from:string
    to:string
    status:string
    duration:string
    dataArr:Array<any>
}

const schema = new Schema({
    name:{type:String,required:true},
    date:{type:String,required:true},
    from:{type:String,required:true},
    to:{type:String,required:true},
    status:{type: String,required:true},
    duration:{type:String,required:true},
    dataArr:{type:Array,required:true}
})

export default model("data" , schema);
