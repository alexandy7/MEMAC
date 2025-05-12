export interface Product {
    id: string;
    category: string;
    productCode: string;
    reference: string;
    brandOrigin: string;
    model: string;
    productDescription: string;
    fiscalClassificationCode: string;
    ipiPercentage: number;
    unit: string;
    stockQuantity: number;
    netWeight: number;
    manufacturingTime: number;
    hasCAD: boolean;
    observation: string;
    netCost: number;
    grossCost: number;
  }
  
  export const emptyProduct: Product = {
    id: '',
    category: '',
    productCode: '',
    reference: '',
    brandOrigin: '',
    model: '',
    productDescription: '',
    fiscalClassificationCode: '',
    ipiPercentage: 0,
    unit: '',
    stockQuantity: 0,
    netWeight: 0,
    manufacturingTime: 0,
    hasCAD: false,
    observation: '',
    netCost: 0,
    grossCost: 0
  };