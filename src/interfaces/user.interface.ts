interface User {
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

export default User;

