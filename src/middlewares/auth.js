import instance from '../lib/firebase.cjs'
import { getAuth } from 'firebase-admin/auth'


export function Authenticate(req, res, next) {

    console.log('HEADERS: ', req.query)
    const token = req.query['token']

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