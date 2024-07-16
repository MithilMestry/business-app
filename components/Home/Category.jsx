import { View, Text, ScrollView,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function Category() {
  return (
    <View>
        <View style={{padding:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold',
            }}>Category</Text>

            <Text style={{
                marginTop:5,
                color:Colors.primary,
                fontFamily:'outfit'
            }}>View All</Text>
    </View>

    <ScrollView horizontal={true}
             style={styles.scroll}
             showsHorizontalScrollIndicator={false}
             >
            <TouchableOpacity style={styles.name} onPress={()=>navigator}>
            <Image source={require('./../../assets/images/shopping-bags.png')} style={styles.image} />
            <Text style={styles.txt}>Shopping</Text></TouchableOpacity>
            <TouchableOpacity style={styles.name}>
            <Image source={require('./../../assets/images/dairy-products.png')} style={styles.image} />
            <Text style={styles.txt}>Dairy Products</Text></TouchableOpacity>
            <TouchableOpacity style={styles.name}>
            <Image source={require('./../../assets/images/technician.png')} style={styles.image} />
            <Text style={styles.txt}>Plumber</Text></TouchableOpacity>
            <TouchableOpacity style={styles.name}>
            <Image source={require('./../../assets/images/hair-cutting.png')} style={styles.image} />
            <Text style={styles.txt}>Salons</Text></TouchableOpacity>
            <TouchableOpacity style={styles.name}>
            <Image source={require('./../../assets/images/shopping-bag.png')} style={styles.image} />
            <Text style={styles.txt}>Grocery</Text></TouchableOpacity>
            <TouchableOpacity style={styles.name}>
            <Image source={require('./../../assets/images/office-supplies.png')} style={styles.image} />
            <Text style={styles.txt}>Statinory</Text></TouchableOpacity>
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        marginLeft: 40,
        marginTop:1,
        // borderRadius:8
    },
    txt:{
        fontFamily:'outfit-medium',
        marginTop:8,
        paddingLeft:35,
        justifyContent:'center',
        alignItems:'center',
    },
    name:{
        alignItems:'center',
        padding:10
    }
});