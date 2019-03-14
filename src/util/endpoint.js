const POST = 'POST'

const apiConfig = {
  'login': {
    url: '/login',
    method: POST,
    canDirectOpen: false
  }
}

const APIStatusCode = {
  OK: 1,
  INTERNAL_ERROR: 50000
}

export {
  apiConfig,
  APIStatusCode
}
