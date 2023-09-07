import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {CATEGORY_IMG} from '../../../assets/image';
import AppIcon from '../../../assets/svg';
import {apiGetListCategory} from '../../api/category';

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 45) / 3;

const CategoryScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(state => state.auth.lsCategory);

  const [lsCategory, setLsCategory] = useState([]);
  const [lsSelected, setLsSelected] = useState([]);

  useEffect(() => {
    handleGetListCategories();
  }, []);

  useEffect(() => {
    setLsCategory(categoryData);
  }, [categoryData]);

  const handleGetListCategories = async () => {
    const data = await dispatch(apiGetListCategory());
    console.log('handleGetListCategories', data);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.welcomeTxt}>Welcome to Nexle Entrance Test</Text>
        <Text style={styles.chooseCategoryTxt}>
          Please select categories what you would like to see on your feed. You
          can set this later on Filter.
        </Text>
      </View>
    );
  };

  const handleItemPress = async item => {
    const existingIndex = lsSelected.findIndex(obj => obj.id === item.id);
    if (existingIndex !== -1) {
      const lsTemp = [...lsSelected];
      lsTemp.splice(existingIndex, 1);
      setLsSelected(lsTemp);
    } else {
      setLsSelected([...lsSelected, ...[item]]);
    }
  };

  const handleDone = async () => {
    await AsyncStorage.setItem('LS_CATEGORY', JSON.stringify(lsSelected));
    console.log('done');
  };

  const renderHeaderBtn = () => {
    return (
      <View style={styles.headerBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon.IconBack />
        </TouchableOpacity>
        {lsSelected.length > 0 && (
          <TouchableOpacity onPress={() => handleDone()}>
            <Text style={styles.whiteTxt}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const MemorizedItem = React.memo(({item}) => {
    const isSelect = lsSelected.find(obj => obj.id === item.id);
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={styles.categoryBtn}>
        <LinearGradient
          colors={
            isSelect ? ['#8A32A9', '#8A00FF'] : ['transparent', 'transparent']
          }
          style={styles.linearGradient}>
          <View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  });

  const renderCategory = () => {
    return (
      <View style={styles.categoryContainer}>
        {renderHeader()}
        {lsCategory?.length > 0 && (
          <FlatList
            data={lsCategory}
            numColumns={3}
            contentContainerStyle={styles.flatlistContent}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <MemorizedItem item={item} />;
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageViewStyle}
        imageStyle={styles.imageBackgroundStyle}
        source={CATEGORY_IMG}
        resizeMode="cover">
        <LinearGradient
          colors={['transparent', 'black', 'black']}
          style={styles.linearGradient}>
          {renderCategory()}
        </LinearGradient>
        {renderHeaderBtn()}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '10%',
    padding: 16,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
  },
  imageViewStyle: {
    flex: 1,
  },
  imageBackgroundStyle: {
    height: '55%',
  },
  headerBtn: {
    position: 'absolute',
    top: 30,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  welcomeTxt: {
    color: '#FFFFFF',
    fontSize: 22,
    paddingBottom: 10,
  },
  categoryContainer: {
    paddingBottom: 30,
  },
  chooseCategoryTxt: {
    color: '#FFFFFFD1',
    fontSize: 14,
    lineHeight: 20,
  },
  categoryBtn: {
    width: itemWidth,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
    margin: 5,
    borderRadius: 8,
  },
  categoryName: {
    color: '#FFFFFFD1',
  },
  flatlistContent: {
    justifyContent: 'space-around',
  },
  whiteTxt: {
    color: 'white',
  },
  headerStyle: {
    paddingTop: '60%',
    paddingHorizontal: 5,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
});

export default CategoryScreen;
