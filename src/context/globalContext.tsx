import axios from 'axios';
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react';

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

export type CafeCoffeContextType = {
  productList: ProductListProps | [];
  fetchData: () => {};
  isLoding: boolean;
  category: any;
};

const Context = createContext<CafeCoffeContextType | {}>({});

const getCategoriesFormDate = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const Provider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [productList, setProductList] = useState<ProductListProps | []>([]);
  const [cat, setCategory] = useState<Object>({});
  const [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    console.log('jhdhadjh');
    const url = `http://10.0.2.2:8000/product/coffee`;
    fetch(url, {method: 'GET'})
      .then(res => {
        setLoading(true);
        if (res.status == 200) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(json => {
        setLoading(false);
        setCategory(getCategoriesFormDate(json));
        return setProductList(json);
      })
      .catch(e => console.log(e));

    // const {data} = await axios.get(url);
    // console.log(data);
    // setProductList(data);
    // setLoading(false);
  };
  const globalContext = {
    productList,
    cat,
    fetchData: fetchData,
    isLoading,
  };

  async function initiApis() {
    const url = `http://10.0.2.2:8000/product/coffee`;
    setLoading(true);
    const {data} = await axios.get(url);

    setProductList(data);
    setLoading(false);
    // fetch(url, {method: 'GET'})
    //   .then(res => {
    //     if (res.status == 200) {
    //       return res.json();
    //     } else {
    //       throw res.json();
    //     }
    //   })
    //   .then(json => setProductList(json))
    //   .catch(e => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export {Context, Provider};

export function useProductContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
