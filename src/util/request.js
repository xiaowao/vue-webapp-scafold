import * as func from './func'
import * as endpoint from './endpoint'

const API_BASE_URL = 'http://localhost:3000'

const defaultAPIErrorHandler = (response) => {
  throw response
}

const buildAPIUrl = (url, urlParameters) => {
  var spRule = /^http/
  if (!url.match(spRule)) {
    url = API_BASE_URL + url
  }
  urlParameters = urlParameters || {}
  let keys = Object.keys(urlParameters)
  if (!keys.length) {
    return url
  }
  let query = keys.map(key => {
    let val = urlParameters[key]
    if (func.isNotNullOrUndefined(val)) {
      if (val instanceof Array) {
        val = val.join(',')
      }
      return `${key}=${val}`
    } else {
      return ''
    }
  }).join('&')
  if (url.indexOf('?') === -1) {
    return `${url}?${query}`
  }
  return `${url}&${query}`
}

class APIRequest {
  constructor (name, errorHandler) {
    var customHeader = new Headers()
    this.options = {
      mode: 'cors',
      headers: customHeader
    }
    this.name = name
    this.errorHandler = defaultAPIErrorHandler
    let config = endpoint.apiConfig[name]
    if (func.isNullOrUndefined(config)) {
      throw new Error(`The api '${name}' is not defined`)
    }
    this.config = config
    this.options.method = this.config.method
    if (config.method === 'POST') {
      customHeader.append('Content-Type', 'text/plain')
    }
    if (errorHandler) {
      this.errorHandler = errorHandler
    }
  }

  internalServerErrorHandler () {
    throw new Error('服务器内部错误，请联系管理员.')
  }

  loginFailedErrorHandler () {
    throw new Error('User are not logged in.')
  }

  openLink (urlParameters) {
    if (!this.config || !this.config.canDirectOpen) {
      throw new Error(`This endPoint ${this.name}${this.config.url} can't open directly.`)
    }
    window.open(this.config.url, urlParameters)
  }

  request (urlParameters, body) {
    var _this = this
    if (body === void 0) {
      body = {}
    }
    if (_this.config.method === 'POST') {
      _this.options.body = JSON.stringify(body)
    }
    return fetch(buildAPIUrl(_this.config.url, urlParameters), _this.options).then(response => {
      console.log(response)
      if (response.status !== 200) {
        _this.internalServerErrorHandler()
      } else {
        return response.json()
      }
    }).then(json => {
      let status = json.status
      if (status === endpoint.APIStatusCode.OK) {
        return json.data
      }
      switch (status) {
        case endpoint.APIStatusCode.INTERNAL_ERROR:
          _this.internalServerErrorHandler()
          break
        default:
          _this.errorHandler(json)
      }
    })
  }
}
export default APIRequest
