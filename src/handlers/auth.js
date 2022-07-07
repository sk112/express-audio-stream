import { SignUpWithEmailPassword } from '../lib/firebase-app.js'

export function signUpHandler(req, res){
    
    console.log('req.body', req.body)

    const email = req.body['email']
    const password = req.body['password1']

    SignUpWithEmailPassword(email, password)

    res.status(503).send({})
}