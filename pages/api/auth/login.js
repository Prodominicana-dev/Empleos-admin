import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export default function loginHandler(req, res){
    const {Id,Email,FullName} = req.body;

    console.log(req.body)

 try {
     //token......
     const token = jwt.sign({
        exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        Id:Id,
        email:Email,
        username:FullName
     },'secreto')
     //cookie......
     const serialized = serialize('cookieAdmin', token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path:'/'
     })
     
    res.setHeader('Set-Cookie',serialized)

    return res.json('login succesfully')
 } catch (error) {
    return res.status(401).json({error:'fallo por: ' + error})
 }
    
}