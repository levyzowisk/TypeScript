import bcrypt from 'bcrypt';



export const crypto = (password: string, salts : number= 10) => {
    return  bcrypt.hashSync(password,salts) 

}

export const comparePassword = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password,userPassword)
}


// Opções de importação
// export {crypto, comparePassword}
