//

const getHeaders = () => ({})

const http = {
  get: async (url) => await fetch({ url, headers: getHeaders() }).then((res) => res.json())
}

export const getValues = (spreadsheetId, range) => http.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`)
