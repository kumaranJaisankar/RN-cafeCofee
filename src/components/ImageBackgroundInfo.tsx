import React from 'react';
import {ImageProps, StyleSheet, Text, View} from 'react-native';

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingridient: string;
  ingredients: string;
  average_rating: number;
  rating_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingridient,
  ingredients,
  average_rating,
  rating_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <Text>ImageBackgroundInfo</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ImageBackgroundInfo;
