import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect, useContext} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ScreenContainer} from 'react-native-screens';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcons from '../components/CustomIcons';
import CoffeeCard from '../components/CoffeeCard';
import {productLists} from '../services/coffeApis';
import {Context, useProductContext} from '../context/globalContext';
import AppLoader from '../components/AppLoader';
import {useCafeStore} from '../store/cafeStore';
import axios from 'axios';

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

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};
const HomeScreen = ({navigation}: any) => {
  const globalContext: any = useProductContext();
  const coffeeLists = useCafeStore((state: any) => state.coffeeDatas);
  const beanLists = useCafeStore((state: any) => state.beansDatas);
  const getCoffeeData = useCafeStore((state: any) => state.getCoffeeData);
  const {productList, cat, fetchData, isLoading} = globalContext;

  // const coffeeListFromProduct: any = coffeeLists.filter(
  //   (val: any) => val.type == 'Coffee',
  // );
  const [categories, setCategories] = useState(
    getCategoriesFormDate(coffeeLists),
  );
  const [categoryIndex, setCategoryindex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sordedCoffeeData, setSortedCoffeeData] = useState(
    getCoffeeList(categoryIndex.category, coffeeLists),
  );

  useEffect(() => {
    async function fun() {
      const url = `http://10.0.2.2:8000/product/coffee`;

      fetch(url, {method: 'GET'})
        .then(res => {
          if (res.status == 200) {
            return res.json();
          } else {
            throw res.json();
          }
        })
        .then(json => {
          // setSortedCoffee(json);
          console.log(json);
          const coffeeListFromProduct: any = json.filter(
            (val: any) => val.type == 'Coffee',
          );
          const beanListFromProduct: any = json.filter(
            (val: any) => val.type == 'Beans',
          );
          getCoffeeData(coffeeListFromProduct, beanListFromProduct);
          setCategories(getCategoriesFormDate(coffeeListFromProduct));
          setSortedCoffeeData(
            getCoffeeList(categoryIndex.category, coffeeListFromProduct),
          );
        })
        .catch(e => console.log('dd'));
    }
    fun();
  }, []);

  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeanList);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToCart = useStore((state: any) => state.addToCart);

  const [searchText, setSearchText] = useState('');

  // const [sortedCoffee, setSortedCoffee] = useState(
  //   getCoffeeList(categoryIndex.category, CoffeeList),
  // );
  const [sortedCoffee, setSortedCoffee] = useState(coffeeLists);

  const listRef: any = useRef<FlatList>();
  const tabBarHight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryindex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...coffeeLists.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryindex({index: 0, category: categories[0]});
    setSortedCoffee([...coffeeLists]);
    setSearchText('');
  };

  // useEffect(() => {
  //   fetchData();
  //   setCategories(getCategoriesFormDate(coffeeLists));
  //   setSortedCoffeeData(
  //     getCoffeeList(categoryIndex.category, coffeeListFromProduct),
  //   );
  //   console.log(coffeeListFromProduct);
  //   console.log('coffeeListFromProduct');
  // }, []);

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  // if (!sordedCoffeeData.length === 0) {
  //   return <ActivityIndicator />;
  // }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar title="kumaran" />
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}Coffee for you
        </Text>
        {/* Seach input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => console.log(coffeeLists)}>
            <CustomIcons
              style={{marginHorizontal: SPACING.space_20}}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            cursorColor={COLORS.primaryOrangeHex}
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(searchText);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputConatiner}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcons
                style={{marginHorizontal: SPACING.space_20}}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {/* category scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data: any, index: number) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  setSearchText('');
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryindex({index: index, category: data});
                  setSortedCoffeeData([
                    ...getCoffeeList(categories[index], coffeeLists),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* coffee flat list */}
        <FlatList
          ref={listRef}
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Cofee Available.</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sordedCoffeeData}
          contentContainerStyle={styles.FlatListConatiner}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('Details', {
                    index: index,
                    id: item.id,
                    type: item.type,
                  })
                }>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={`${
                    item.prices != undefined && item.prices!.at(0).price
                  }-${
                    item.prices != undefined &&
                    item.prices.at(item.prices!.length - 1).price
                  }`}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* beans flat list */}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanLists}
          contentContainerStyle={[
            styles.FlatListConatiner,
            {marginBottom: tabBarHight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('Details', {
                    index: index,
                    id: item.id,
                    type: item.type,
                  })
                }>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={`${
                    item.prices != undefined && item.prices!.at(0).price
                  }-${
                    item.prices != undefined &&
                    item.prices.at(item.prices!.length - 1).price
                  }`}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  TextInputConatiner: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: '#fff',
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  FlatListConatiner: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.2,
  },
});
export default HomeScreen;
