import { View, Text, ScrollView, } from 'react-native'
import Header from './../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  return (
    <View>
      <ScrollView>
      <Header />

      <Slider />

      <Category/>

      <PopularBusiness/>

      <View style={{height:80}}></View>
      </ScrollView>
    </View>
  )
}