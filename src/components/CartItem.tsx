import React, {useId} from 'react';
import {
  ImageProps,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomIcons from './CustomIcons';
import {useStore} from '../store/store';

interface CartItemProps {
  id: string;
  title: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CartListLinearGradient}>
          <View style={styles.SimpleCartContainer}>
            <Image source={imagelink_square} style={styles.ImageSizeStyle} />
            <View style={styles.PriceDetailContainer}>
              <Text style={styles.NameTextStyle}>{title}</Text>
              <Text style={styles.IngredientTextStyle}>
                {special_ingredient}
              </Text>
              <View style={styles.SizeAndPriceContainer}>
                <View style={styles.RostedContainer}>
                  <Text style={styles.RostedText}>{roasted}</Text>
                </View>
              </View>
            </View>
          </View>
          {prices.map((data: any, index: any) => {
            return (
              <View
                key={`${index}`}
                style={styles.AllQuantityControllContainer}>
                <View style={[styles.SizeAndPriceContainer, {flex: 1}]}>
                  <View style={styles.ProductSizeContainer}>
                    <Text style={styles.ProductSizeText}>{data.size}</Text>
                  </View>
                  <Text style={styles.priceText}>
                    ₹{' '}
                    <Text style={{color: COLORS.primaryWhiteHex}}>
                      {data.price}
                    </Text>
                  </Text>
                </View>
                <View style={[styles.QuantityControllContainer, {flex: 1}]}>
                  <TouchableOpacity
                    style={styles.QuantityButtonStyle}
                    onPress={() =>
                      decrementCartItemQuantityHandler(id, data.size)
                    }>
                    <CustomIcons name="minus" color={COLORS.primaryWhiteHex} />
                  </TouchableOpacity>
                  <View style={styles.QuantityContainer}>
                    <Text style={styles.ProductSizeText}>{data.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.QuantityButtonStyle}
                    onPress={() =>
                      incrementCartItemQuantityHandler(id, data.size)
                    }>
                    <CustomIcons name="add" color={COLORS.primaryWhiteHex} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
          style={styles.CartListLinearGradient}>
          <View style={styles.SimpleCartContainer}>
            <Image source={imagelink_square} style={styles.ImageStyle} />
            <View style={styles.PriceDetailContainer}>
              <Text style={styles.NameTextStyle}>{title}</Text>
              <Text style={styles.IngredientTextStyle}>
                {special_ingredient}
              </Text>
              <View style={styles.SizeAndPriceContainer}>
                <View style={styles.ProductSizeContainer}>
                  <Text style={styles.ProductSizeText}>{prices[0].size}</Text>
                </View>
                <Text style={styles.priceText}>
                  ₹{' '}
                  <Text style={{color: COLORS.primaryWhiteHex}}>
                    {prices[0].price}
                  </Text>
                </Text>
              </View>
              <View style={styles.QuantityControllContainer}>
                <TouchableOpacity
                  style={styles.QuantityButtonStyle}
                  onPress={() =>
                    decrementCartItemQuantityHandler(id, prices[0].size)
                  }>
                  <CustomIcons name="minus" color={COLORS.primaryWhiteHex} />
                </TouchableOpacity>
                <View style={styles.QuantityContainer}>
                  <Text style={styles.ProductSizeText}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.QuantityButtonStyle}
                  onPress={() =>
                    incrementCartItemQuantityHandler(id, prices[0].size)
                  }>
                  <CustomIcons name="add" color={COLORS.primaryWhiteHex} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {width: 150, height: 150, borderRadius: BORDERRADIUS.radius_15},
  ImageSizeStyle: {
    width: 100,
    height: 100,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CartListLinearGradient: {
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_15,
    paddingEnd: SPACING.space_20,
  },
  SimpleCartContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  PriceDetailContainer: {flex: 1},
  NameTextStyle: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  IngredientTextStyle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  SizeAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_10,
    gap: SPACING.space_20,
  },
  ProductSizeContainer: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_4,
  },
  RostedContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
  },
  ProductSizeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_20,
  },
  QuantityButtonStyle: {
    backgroundColor: COLORS.primaryOrangeHex,
    width: 30,
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QuantityControllContainer: {
    marginTop: SPACING.space_10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  QuantityContainer: {
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RostedText: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
  },
  AllQuantityControllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_10,
    flexGrow: 1,
  },
});
export default CartItem;
