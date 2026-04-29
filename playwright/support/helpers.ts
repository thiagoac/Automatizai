export function gerarCodigoVLO() {
    const prefixo = "VLO-";
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let sufixo = "";
    
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      sufixo += caracteres.charAt(indiceAleatorio);
    }
    
    return prefixo + sufixo;
  }
