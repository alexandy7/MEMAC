export interface NaturezaOperacao {
    id?: number;
    codigo: string;
    cfop: string;
    tipo: string;
    subtipo: string;
    descricao: string;
    descricaoReduzida: string;
    condicaoIPI: string;
    condicaoICMS: string;
    percentualICMS: number;
    percentualReducaoICMS: number;
    validadeDuplicata: boolean;
    baixaEstoque: boolean;
  }
  