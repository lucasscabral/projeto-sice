import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validaCpf', async: false })
export class ValidadeCpf implements ValidatorConstraintInterface {
    validate(cpf: string) {
        return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/.test(cpf);
    }

    defaultMessage() {
        return 'CPF INVÁLIDO';
    }
}

