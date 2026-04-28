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

export default function RestaurantDetailScreen({ route }) {
  const { id } = route.params
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>
        Restaurant details. Id: {id}
      </TextRegular>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
