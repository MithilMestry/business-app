// import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
// import React from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { deleteDoc, doc } from 'firebase/firestore';
// import { db } from './../../config/FirebaseConfig';
// import { useUser } from '@clerk/clerk-expo';

// export default function Intro({ business }) {

//     const router=useRouter();

//     const user=useUser();

//   //   const likeShop = async (id) => {
//   //     try {
//   //         const userFavoritesRef = doc(db, 'UserFavorites', user.id);
//   //         await setDoc(userFavoritesRef, {
//   //             favorites: [id]
//   //         }, { merge: true });
//   //         ToastAndroid.show('Added to Favorites!', ToastAndroid.BOTTOM);
//   //     } catch (error) {
//   //         ToastAndroid.show('Failed to add to Favorites', ToastAndroid.BOTTOM);
//   //         console.error("Error adding to favorites: ", error);
//   //     }
//   // };

  

//     const OnDelete=()=>{
//       Alert.alert('Delete Business ?','Do You Really Want to Delete This Business Post',[
//         {
//           text:'Cancel',
//           style:'cancel',
//         },
//         {
//           text:'Delete',
//           style:'destructive',
//           onPress:()=>deleteBusiness()
//         },
//       ]);
//     }

//     const deleteBusiness=async()=>{
//       console.log("Business Deleted...")
//       await deleteDoc(doc(db,'BusinessList',business?.id));
//       router.back();
//       ToastAndroid.show('Business Deleted !',ToastAndroid.BOTTOM);
//     }

//   if (!business || !business.imageUrl) {
//     return (
//       <View>
//         <Text>No business data available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//         <View style={{
//             position:'absolute',
//             zIndex:1,
//             display:'flex',
//             flexDirection:'row',
//             justifyContent:'space-between',
//             width:'100%',
//             padding:25
//         }}>
//             <TouchableOpacity onPress={()=>router.back()}>
//             <Ionicons name="chevron-back-circle-sharp" size={34} color="black" />
//             </TouchableOpacity>

//         <TouchableOpacity onPress={()=>likeShop(business.id)}>
//         <Ionicons name="heart-outline" size={35} color="black" />
//         </TouchableOpacity>
//         </View>
//       <Image
//         source={{ uri: business.imageUrl }}
//         style={{
//           width: '100%',
//           height: 310,
//         }}
//       />

//       <View style={{
//         display:'flex',
//         flexDirection:'row',
//         backgroundColor:'#fff'
//       }}>
//       <View style={{
//             padding:20,
//             marginTop:-20,
//             backgroundColor:'#fff',
//             display:'flex',
//             flexDirection:'row',
//             justifyContent:'space-between',
//             borderTopRightRadius:25,
//             borderTopLeftRadius:25,
//       }}>
//       <Text style={{
//         fontFamily:'outfit-bold',
//         fontSize:30,
//       }}>{business.name}</Text>

//       <Text style={{
//         fontFamily:'outfit',
//         fontSize:16,
//       }}>{business.address}</Text>
//       </View>


//      {user?.primaryemailAddress?.emailAddress==business?.userEmail&& <TouchableOpacity onPress={()=>OnDelete()}>
//     <Ionicons name="trash" size={24} color="red" />
//     </TouchableOpacity>}
    
//     </View>
//     </View>
//   );
// }


import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({ business }) {

    const router = useRouter();

    const { user } = useUser();

    const likeShop = async (id) => {
        try {
            const userFavoritesRef = doc(db, 'UserFavorites', user.id);
            const userFavoritesDoc = await getDoc(userFavoritesRef);

            if (userFavoritesDoc.exists()) {
                const userData = userFavoritesDoc.data();
                const favorites = userData.favorites || [];

                if (favorites.indexOf(id) === -1) {
                    await updateDoc(userFavoritesRef, {
                        favorites: arrayUnion(id)
                    });
                    ToastAndroid.show('Added to Favorites!', ToastAndroid.BOTTOM);
                } else {
                    ToastAndroid.show('Already in Favorites', ToastAndroid.BOTTOM);
                }
            } else {
                await setDoc(userFavoritesRef, {
                    favorites: [id]
                });
                ToastAndroid.show('Added to Favorites!', ToastAndroid.BOTTOM);
            }
        } catch (error) {
            ToastAndroid.show('Failed to add to Favorites', ToastAndroid.BOTTOM);
            console.error("Error adding to favorites: ", error);
        }
    };

    const OnDelete = () => {
        Alert.alert('Delete Business ?', 'Do You Really Want to Delete This Business Post', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteBusiness()
            },
        ]);
    }

    const deleteBusiness = async () => {
        console.log("Business Deleted...")
        await deleteDoc(doc(db, 'BusinessList', business?.id));
        router.back();
        ToastAndroid.show('Business Deleted!', ToastAndroid.BOTTOM);
    }

    if (!business || !business.imageUrl) {
        return (
            <View>
                <Text>No business data available.</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 25
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-circle-sharp" size={34} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => likeShop(business.id)}>
                    <Ionicons name="heart-outline" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: business.imageUrl }}
                style={{
                    width: '100%',
                    height: 310,
                }}
            />

            <View style={{
                display: 'flex',
                // flexDirection: 'row',
                backgroundColor: '#fff'
            }}>
                <View style={{
                    padding: 20,
                    marginTop: -20,
                    backgroundColor: '#fff',
                    display: 'flex',
                    // flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize:30,
                    }}>{business.name}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                    }}>{business.address}</Text>

                {user?.primaryEmailAddress?.emailAddress == business?.userEmail && <TouchableOpacity onPress={() => OnDelete()}>
                    <Ionicons name="trash" size={24} color="red" style={{
                    top:-50,
                    left:290,
                    }}/>
                </TouchableOpacity>}

                </View>

                    
                
                

            </View>
        </View>
    );
}
