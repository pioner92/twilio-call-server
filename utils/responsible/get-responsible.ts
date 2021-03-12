//@ts-ignore

const axios = require('axios')
const qs = require('querystring')


type ResponseData = {
    id: number
    email: string,
    login: string
    phone: string
    name: string
    group: string
}

type getResponsibleType = (companyName: string, number: string) => Promise<string | undefined>

export const getResponsible: getResponsibleType = async (companyName, number) => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const data = {
            action: 'get_responsible',
            driver_phone: number
        }

        const response = await axios.post(`https://${companyName}.altek.app/wp-admin/admin-ajax.php`, qs.stringify(data), config)
            return response.data.phone
    }
    catch (e) {
        console.log('Get responsible ERROR: ',e)
    }
}
