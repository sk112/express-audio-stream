import instance from '../lib/firebase.cjs'
import { getAuth } from 'firebase-admin/auth'


export function Authenticate(req, res, next) {

    console.log('HEADERS: ', req.headers)
    const token = req.headers['Authorization']

    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log('in middle: ', uid)
        })
        .catch((error) => {
            console.error(err)
        });
    next()
}