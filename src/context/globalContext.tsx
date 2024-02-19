import React, {useState, useEffect, useRef, createContext} from 'react';
import {productLists} from '../services/coffeApis';

export interface ProductListProps {
  id: string;
  prices: Price[];
  name: string;
  type: string;
  description: string;
  rosted: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: string;
  rating_counts: number;
  imagelink_square: string;
  imagelink_portrait: string;
}

export interface Price {
  size: string;
  price: number;
  currency: string;
}

export interface CafeCoffeContextType {
  productList: ProductListProps | [];
}

const Context = createContext<CafeCoffeContextType | null>(null);

const Provider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [productList, setProductList] = useState<ProductListProps | []>([]);
  const globalContext = {
    productList,
  };

  useEffect(() => {
    productLists().then(res => setProductList(res));
  }, []);

  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export {Context, Provider};
