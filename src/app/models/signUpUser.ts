export class SignUpUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    constructor(nombre: string, nombreUsuario: string, email: string, password: string) {
        this.name = nombre;
        this.lastName = nombreUsuario;
        this.email = email;
        this.password = password;
    }
}