import { verify } from "jsonwebtoken";
import  cookie, { serialize }  from "cookie";

export default function logoutHandler(req, res){
 const {cookieAdmin}=req.cookies


 try {
    verify(cookieAdmin,'secreto')
    const serialized = serialize('cookieAdmin', null, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge: 0,
        path:'/'
     })

     res.setHeader('Set-Cookie',serialized)
     res.status(200).json('logout succesfully')
 } catch (error) {
    return res.status(401).json({error:'invalid token'})
 }

}