import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcons from './CustomIcons';
import BgIcon from './BgIcon';
import {Price} from '../context/globalContext';

const CARD_WIDTH = Dimensions.get('window').width * 0.3;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  rosted: string;
  imagelink_square: string;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}
const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  rosted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  console.log(imagelink_square);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={{uri: `${imagelink_square}`}}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcons
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CartRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CradCoffeeNameText}>{name}</Text>
      <Text style={styles.cardCoffeeImgredientText}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceText}>
          ₹{' '}
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
            }}>{`${price}`}</Text>
        </Text>
        <TouchableOpacity
          onPress={() =>
            buttonPressHandler({
              id,
              index,
              type,
              roasted: rosted,
              imagelink_square,
              name,
              special_ingredient,
              average_rating,
              prices: [{...price, quantity: 1}],
            })
          }>
          <BgIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,

    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    right: 0,
    top: 0,
  },
  CartRatingText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CardPriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  CradCoffeeNameText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  cardCoffeeImgredientText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    marginBottom: SPACING.space_10,
  },
});
export default CoffeeCard;
