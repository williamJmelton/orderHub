export interface Product {
  name: string;
  price: number;
  onHandQty: number;
  description: string;
  costPrice: number;
  class: string;
  category: string;
  id: string;
  units: {
    unit1: '' | 'box' | 'case' | 'each',
    unit1Qty: number,
    unit1Barcode: string,
    unit2: '' | 'box' | 'case' | 'each',
    unit2Qty: number,
    unit2Barcode: string,
    unit3: '' | 'box' | 'case' | 'each',
    unit3Qty: number,
    unit3Barcode: string
  };
  useClassProperty: boolean;
}
