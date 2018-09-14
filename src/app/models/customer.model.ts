export interface Customer {
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  cell: string;
  phone: string;
  taxid: number;
  name: string;
}
