export class LoginUser {
    email: string;
    password: string;

    constructor(nombreUsuario: string, password: string) {
        this.email = nombreUsuario;
        this.password = password;
    }
}