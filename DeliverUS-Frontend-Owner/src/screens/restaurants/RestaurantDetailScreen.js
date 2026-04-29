import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Image,
  Pressable
} from 'react-native'
import TextRegular from '../../components/TextRegular'
import { API_BASE_URL } from '@env'
import { getDetail } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
import TextSemiBold from '../../components/TextSemiBold'
import ImageCard from '../../components/ImageCard'
import productLogo from '../../../assets/product.jpeg'


export default function RestaurantDetailScreen({ route }) {

  const [restaurant, setRestaurant] = useState({}) 
  // {} para decir que un objeto y [] para una lista, en este caso un objeto porque la 
  // info del restaurante es un objeto, no una lista
  // useState para guardar la info del restaurante que se va a mostrar en esta pantalla

  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])

//FUNCION 

const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }

 const renderHeader = () => {
      return (
        <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
          <View style={styles.restaurantHeaderContainer}>
              <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
              <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
              <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
          </View>
        </ImageBackground>
      )
    }

  
  const renderProductWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.image ? { uri: API_BASE_URL + '/' + item.image } : productLogo}
        title={item.name}
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
      </ImageCard>
    )
  }

const { id } = route.params
  
return (
        <View style={styles.container}>
            <FlatList
              style={styles.container}
              data={restaurant.products}
              renderItem={renderProductWithImageCard}
              ListHeaderComponent={renderHeader}
              keyExtractor={item => item.id.toString()}
            />
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})
