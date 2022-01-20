import { getAuth } from 'firebase-admin/auth'
import firebase from './firebase.cjs'

export function SocketAuthMiddleware(socket, next) {

    const token = socket.request._query.token
    console.log('Socket Auth Middleware....')

    getAuth()
        .verifyIdToken(token)
        .then(value => {

            next()
        })
        .catch(err => {
            console.error('socket topken auth error: ', err)
            next(new Error('Socket Token Decode'))
        })
}