import { request } from '../../../assets/js/utils/ajax.js'

const url = (...params) => Array.from(['/api/v1/vestibular', ...params]).join('/')

const API = {}

API.getTest = ({ where, when, which = 0 } = {}) => request('GET', url('tests', where, when, `${which}.json`))

API.getTestsList = ({ } = {}) => request('GET', url('tests', 'index.json'))
