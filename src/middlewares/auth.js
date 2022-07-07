// import instance from '../lib/firebase.js'
import { getAuth } from 'firebase-admin/auth'
import { WILD_URLS } from '../constants/global.js'

/** 
* Authentication middleware implementation
* ----------------------------------------
* parses Authentication Bearer from request 
* and verifies the token with firebase-admin API
* 
*/
export function Authenticate(req, res, next) {

    console.log('HEADERS: ', req.query)
    const token = req.header('Authorization').split(' ')[1]

    // Check for Wildcard URLS
    console.log('req.baseUrl: ', token)
    if(WILD_URLS.includes(req.path)){
        next();
        return;
    }

    // Check if token is present in the request query.
    if(!token){
        res.status(404).send('Auth Error: Token Missing')
        return;
    }

    // Verify token logic
    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log('in middle: ', uid)
        })
        .catch((error) => {
            console.error(err)
            res.status(404).send('Auth Error')
        });
    
        // TODO:
        // verify if next() can be moved to getAuth.then() with appropriate error response
    next()
}