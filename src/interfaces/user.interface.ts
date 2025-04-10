interface user {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    address_id?: number,
    street: string,
    city: string,
    state: string,
    country: string
}

type userRegister = Pick<user, "first_name" | "last_name" | "email" | "password">

export {
    user,
    userRegister
};

