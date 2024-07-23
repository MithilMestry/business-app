import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FirebaseConfig'
import { useLocalSearchParams } from 'expo-router'
import { getDoc, doc } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetails/Intro';
import ActionButton from '../../components/BusinessDetails/ActionButton';
import About from '../../components/BusinessDetails/About';


export default function BusinessDetail() {

  const {businessid}=useLocalSearchParams();
  const [business, setBusiness]=useState();
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    getBusinessDetailById();
  },[])

  const getBusinessDetailById=async()=>{
    setLoading(true);
    const docRef=doc(db,'BusinessList',businessid);
    const docSnap=await getDoc(docRef);
    if (docSnap.exists()){
      console.log('Document Data', docSnap.data());
      setBusiness(docSnap.data());
    }else{
      console.log('no such data ')
    }
    setLoading(false)
  };

  return (
    <View>
      {loading? (
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.primary}
      />):(

      <ScrollView>

        <Intro business={business}/>

        <ActionButton  business={business}/>

        <About business={business}/>

      </ScrollView>
)}
      {/* <Text>{businessid}</Text> */}
    </View>

  )
}

// import { View, Text, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { db } from './../../config/FirebaseConfig';
// import { useLocalSearchParams } from 'expo-router';
// import { doc, getDoc } from 'firebase/firestore';
// import { Colors } from '../../constants/Colors';

// export default function BusinessDetail() {
//   const { businessid } = useLocalSearchParams();
//   const [business, setBusiness] = useState(null); 
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (businessid) {
//       getBusinessDetailById();
//     }
//   }, [businessid]);

//   const getBusinessDetailById = async () => {
//     setLoading(true); 
//     const docRef = doc(db, 'BusinessList', businessid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log('Document Data', docSnap.data());
//       setBusiness(docSnap.data());
//     } else {
//       console.log('No such document!');
//     }
//     setLoading(false); 
//   };

//   return (
//     <View>
//       {loading ? (
//         <ActivityIndicator
//           style={{
//             marginTop: '70%',
//           }}
//           size="large"
//           color={Colors.primary}
//         />
//       ) : (
//         <View>
//           {business ? <Text>{business.name}</Text> : <Text>No business details available.</Text>}
//         </View>
//       )}
//     </View>
//   );
// }
