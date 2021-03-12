enum companyHash {
    cnu = "5154218697735209081"
}

export const companyNameValidate = (companyName:string)=>{
    switch (companyName){
        case companyHash.cnu : return "cnu"
        default: return  companyName
    }
}