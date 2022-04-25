class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, `cpfLimpo`, {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigitos(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigitos(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigitos(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for (let stringNumerica of cpfSemDigitos) {
            // console.log(stringNumerica);
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? digito : String('0');
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length > 11 && this.cpfLimpo.length < 11) return false;
        if (this.eSequencia()) return false;
        this.geraNovoCpf();
        console.log(this.novoCPF);
        return this.novoCPF === this.cpfLimpo;
    }
}

let validacpf = new ValidaCPF('070-987-720-03');
// let validacpf = new ValidaCPF('999.999.999-99');
if (validacpf.valida()) {
    console.log('CPF valido');
} else {
    console.log('CPF inválido');
}
