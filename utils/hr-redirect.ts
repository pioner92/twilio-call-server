
const companyService = (companyName: string, number: string) => {
    return ({
        companyName,
        number
    })
}

const hrList: Array<ReturnType<typeof companyService>> = [
    companyService('hrms', '+12673881855'),
    companyService('hrpenn', '+12678885584')
]

export const hrRedirect = (companyName: string) => {
    const hr = hrList.find((el) => el.companyName === companyName)
    if (hr) {
        return hr
    }
}
