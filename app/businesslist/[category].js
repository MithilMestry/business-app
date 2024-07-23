import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig'
import BusinessListCard from './../../components/BusinessList/BusinessListCard'
import { Colors } from '../../constants/Colors';

export default function BusinessListbyCategory() {

  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState([]);
  const [loading, setloading]=useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    });

    if (category) {
      getBusinessList();
    } else {
      console.error('Category is not defined');
    }

  }, [category]);

  const getBusinessList = async () => {
    setloading(true)
    try {
      const q = query(collection(db, 'BusinessList'), where("category", '==', category));
      const querySnapshot = await getDocs(q);

      const businessData = [];
      querySnapshot.forEach((doc) => {
        businessData.push({ id: doc.id, ...doc.data() }); // Ensure there's an id for key
      });
      setloading(false)

      setBusinessList(businessData);
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  }

  return (
    <View>
      {businessList?.length>0&&loading==false? 
      <FlatList 
        data={businessList}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({ item }) => (
          <BusinessListCard 
            business={item}
            key={item.id} // Use unique id from the business object
          />
        )}
      />:loading? <ActivityIndicator 
      style={{
        marginTop:'80%'

      }}
        size={'large'}
        color={Colors.primary}
      />:
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color:Colors.primary,
        textAlign:'center',
        marginTop:'80%'
      }}>
        No Business Found
      </Text>}
    </View>
  )
}
