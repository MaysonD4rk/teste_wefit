export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
  
    // Verifica se todos os dígitos são iguais, o que invalida o CPF
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
  
    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;
  
    // Verifica o primeiro dígito verificador
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
  
    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;
  
    // Verifica o segundo dígito verificador
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
  
    // CPF válido
    return true;
  }
  
export function emailIsValid(email: string): boolean {
// Expressão regular para verificar a sintaxe básica de um endereço de e-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Retorna true se o endereço de e-mail corresponder à expressão regular, caso contrário, retorna false
return emailRegex.test(email);
}