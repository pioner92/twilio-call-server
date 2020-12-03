import {SDK} from "@ringcentral/sdk";
import FormData from 'form-data'

require('dotenv').config()
require('dotenv').config({path: "../../dotenv-sandbox"})


const rcsdk = new SDK({
    server: process.env.RC_SERVER_URL,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET
})
const RECIPIENT = '4844602222'

const formData = new FormData()

const platform = rcsdk.platform()

export const sendFax = async () => {
    formData.append('json', new Buffer(JSON.stringify({
        to: [{'phoneNumber': RECIPIENT}],
        faxResolution: 'High',
        coverPageText: "This is a demo Fax page from Node JS"
    })), {
        filename: 'request.json',
        contentType: 'application/json'
    });
    formData.append('attachment', require('fs').createReadStream('./test.jpg'));

    await platform.login({
        username: process.env.RC_USERNAME,
        password: process.env.RC_PASSWORD,
        extension: process.env.RC_EXTENSION
    })

    await platform.post(`/restapi/v1.0/account/${process.env.RC_USERNAME}/extension/${process.env.RC_EXTENSION}/fax`, formData)
}
