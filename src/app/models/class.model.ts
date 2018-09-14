export interface Class {
  name: string;
  category: string;
  price: number;
  id: string;
  cost: number;
  units: {
    unit1: '' | 'box' | 'case' | 'each',
    unit1Qty: number,
    unit2: '' | 'box' | 'case' | 'each',
    unit2Qty: number,
    unit3: '' | 'box' | 'case' | 'each',
    unit3Qty: number
  };
}
