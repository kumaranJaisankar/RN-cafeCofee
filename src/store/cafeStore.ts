import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const useCafeStore = create(set => ({
  coffeeDatas: [],
  beansDatas: [],
  getCoffeeData: (coffeedata: any, beanData: any) =>
    set((state: any) => {
      //   const url = `http://10.0.2.2:8000/product/coffee`;
      //   const datas = fetch(url, {method: 'GET'})
      //     .then(res => {
      //       if (res.status == 200) {
      //         return res.json();
      //       } else {
      //         throw res.json();
      //       }
      //     })
      //     .then(json => {
      //       return json;
      //     });
      //   console.log(datas);
      //   const {data} = await axios.get(url);
      return {coffeeDatas: coffeedata, beansDatas: beanData};
    }),
}));

// persist(
//   (set, get) => ({
//     coffeeDatas: [{name: 'kumaran'}],
//     beansDatas: [],
//     getCoffeeData: () =>
//       set(
//         produce(async state => {
//           const url = `http://10.0.2.2:8000/product/coffee`;

//           const {data} = await axios.get(url);
//           state.coffeeDatas = [{name: 'saraava'}];
//         }),
//       ),
//   }),
//   {
//     name: 'cafeCoffee',
//     storage: createJSONStorage(() => AsyncStorage),
//   },
// );
