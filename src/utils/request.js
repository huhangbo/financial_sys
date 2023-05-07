import axios from "axios"
import cookie from 'react-cookies';

axios.defaults.baseURL = "http://127.0.0.1:8888"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEyMywiZXhwIjoxNjg0MDAwNTUyLCJpc3MiOiJmbHlpbmcifQ.Y8kdnWClCzbwiHI0mE_qrjrLvleb5qKkiv5foVWRoxk"
export function request (method, url, data) {
    return new Promise((resolve, reject) => {
        let token = cookie.load("token")
        console.log(token)
        switch (method) {
            case "get":
                axios.get(url, {headers: {Authorization: "Bearer "+ token} }).then(response => {
                    if(response.data.code === 200) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data)
                    }
                })
                break
            case "post":
                axios.post(url, data, {headers: {Authorization: "Bearer "+ token} }).then(response => {
                    if(response.data.code === 200) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data)
                    }
                })
                break
        }
    })
}

