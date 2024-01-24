import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import EmptyListAnimation from '../components/EmptyListAnimation';

const FavoritesScreen = ({navigation, route}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={{flex: 1}}>
          <HeaderBar title="Favourites" />
          {FavoritesList.length == 0 ? (
            <EmptyListAnimation title="Favourite is Empty" />
          ) : (
            <View style={styles.FavouriteScrollContainer}>
              {FavoritesList.map((data: any) => (
                <TouchableOpacity
                  key={data.id}
                  style={styles.FavouriteCard}
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}>
                  <ImageBackgroundInfo
                    EnableBackHandler={false}
                    imagelink_portrait={data.imagelink_portrait}
                    type={data.type}
                    id={data.id}
                    favourite={data.favourite}
                    name={data.name}
                    special_ingredient={data.special_ingredient}
                    ingredients={data.ingredients}
                    average_rating={data.average_rating}
                    ratings_count={data.ratings_count}
                    roasted={data.roasted}
                    BackHandler={() => {}}
                    ToggleFavourite={ToggleFavourite}
                  />
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.DescriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText} numberOfLines={3}>
                      {data.description}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {flexGrow: 1},
  FavouriteScrollContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_36,
    gap: SPACING.space_20,
  },
  FavouriteCard: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  descriptionTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  DescriptionContainer: {
    padding: SPACING.space_20,
  },
});
export default FavoritesScreen;
