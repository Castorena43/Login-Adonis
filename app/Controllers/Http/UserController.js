'use strict'

const User = use('App/Models/User')

class UserController {
    async registro ({request, response}){
        const objeto = request.all()
        const user = new User();
        user.username = objeto.username;
        user.password = objeto.password;
        user.email = objeto.email;
        try{
            const data = await user.save();
            if(data)
                return response.status(201).json(user);
            return response.status(400).json({mensaje:"Datos no validos"});
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validos",user});
        } 
    }

    async login ({auth,request,response}){
        const {email, password} = request.all();
        
        try{
            const token = await auth.attempt(email, password);
            if(token)
                return response.status(201).json(token);
            return response.status(400).json({mensaje:"Datos no validos"});
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validoss"});
        } 
    }
    async logout ({auth,response}){
          
        //const userr = await User.find(1);     
        try{
            const apiToken = await auth.getAuthHeader()
            await auth.authenticator('api').revokeTokens([apiToken])                
                return response.status(201).json({message:"La sesion se ha cerrado",apiToken:apiToken})
        }   
        catch(error){
            return response.status(400).json({mensaje:"Datos no validoss",error:error})
        } 
    }

    async consumir({auth,response}){
        try{
            const usuarios = await User.all()
                return response.status(200).json({usuarios})
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validoss",error:error})
        }
    }
}

module.exports = UserController
