import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


//TouchableOpacity, the opacity of the view decreases, giving it a dimmed effect


// using a custom hook called useStore from the ../store/store module. This hook likely manages state or data related to your app.



import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';


// FavoritesList: This likely represents the list of items marked as favorites.
// tabBarHeight: It might be used to adjust the layout based on the height of the bottom tab bar.
// addToFavoriteList and deleteFromFavoriteList: These functions probably handle adding and removing items from the favorites list.


const FavoritesScreen = ({navigation}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  // If an item is already a favorite (favourite is true), it removes it from the favorites list using deleteFromFavoriteList.
// Otherwise, it adds the item to the favorites list using addToFavoriteList.
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favourites" />

{/* FavoritesList is empty, it displays an “Empty Favorites” animation using the EmptyListAnimation component. */}
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default FavoritesScreen;
