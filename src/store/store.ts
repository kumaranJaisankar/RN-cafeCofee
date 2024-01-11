import {create} from 'zustand';

import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      FavouritList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;

            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[0].size) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (let i = 1; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j > state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalPrice = totalPrice + tempprice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoritList: (type: string, id: string) =>
        set(
          produce(state => {
            if ((type = 'Coffee')) {
              for (let i = 0; i < state.Coffeelist.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == false) {
                    state.Coffeelist[i].favourite = true;
                    state.FavouritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if ((type = 'Bean')) {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeansList[i].id == id) {
                  if (state.BeansList[i].favourite == false) {
                    state.BeansList[i].favourite = true;
                    state.FavouritesList.unshift(state.BeansList[i]);
                  }
                  break;
                }
              }
            }
          }),
        ),
      deleteFromFavouriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.Coffeelist.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == true) {
                    state.Coffeelist[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type == 'Beans') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id == id) {
                  if (state.BeanList[i].favourite == true) {
                    state.BeanList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavouritesList.length; i++) {
              if (state.FavouritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavouritesList.splice(spliceIndex, 1);
          }),
        ),
    }),
    {
      name: 'cafeCoffee',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
