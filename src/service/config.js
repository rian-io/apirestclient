import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://rian-apirest-produtos.herokuapp.com/api/'
})