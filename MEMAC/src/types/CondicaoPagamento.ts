export interface CondicaoPagamento {
    id: string;
    codigo: string;
    descricaoCompleta: string;
    descricaoReduzida: string;
    diasVencimento: number;
    diasDesconto: number;
  }
  
  export interface CondicaoPagamentoFormData {
    codigo: string;
    descricaoCompleta: string;
    descricaoReduzida: string;
    diasVencimento: number;
    diasDesconto: number;
  }
  