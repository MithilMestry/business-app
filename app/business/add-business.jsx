import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import {db, storage} from './../../config/FirebaseConfig';
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  
      const navigation=useNavigation();
      const [image,setImage]=useState(null);
      const [categoryList,setCategoryList]=useState([]);

      const {user}=useUser();

      const [name,setName]=useState();
      const [address,setAddress]=useState();
      const [contact,setContact]=useState();
      const [website,setWebsite]=useState();
      const [about,setAbout]=useState();
      const [category,setCategory]=useState();
      const [loading,setLoading]=useState(false);


      const OnImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          // aspect: [4, 3],
          quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result);
      }

      useEffect(()=>{
        navigation.setOptions({
          headerShown:true,
          headerTitle:'Add New Business'
        })
        GetCategoryList();
      },[])

      const GetCategoryList=async()=>{
        setCategoryList([])
        const q=query(collection(db,'Category'));
        const snapShot=await getDocs(q);

        snapShot.forEach((doc)=>{
          console.log(doc.data())
          setCategoryList(prev=>[...prev,{
            label:(doc.data()).name,
            value:(doc.data()).name
          }])
        })
      }

      // const AddNewBusiness=async()=>{
      //   const fileName=Date.now().toString()+".jpg";
      //   const resp=await fetch(image);
      //   const blob=await resp.blob();

      //   const imageRef=ref(storage,'Images'/+fileName);
      //   uploadBytes(imageRef,blob).then((snapShot)=>{
      //     console.log("File uploaded")
      //   });
      
      // }

      const AddNewBusiness = async () => {
        setLoading(true);
        
            const fileName = Date.now().toString() + ".jpg";
            const resp = await fetch(image);
            const blob = await resp.blob();
    
            const imageRef = ref(storage, `business-book/${fileName}`);
            uploadBytes(imageRef, blob).then((snapShot) => {
                console.log("File uploaded");
            }).then(resp=>{
              getDownloadURL(imageRef).then(async(downloadURL)=>{
                console.log(downloadURL);
                saveBusinessDetail(downloadURL)
              })
            })
            setLoading(false);
    };

    const saveBusinessDetail=async(imageUrl)=>{
        await setDoc(doc(db,'BusinessList',Date.now().toString()), {
          name:name,
          contact:contact,
          address:address,
          about:about,
          website:website,
          category:category,
          username:user?.fullName,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userImage:user?.imageUrl,
          imageUrl:imageUrl
        })
        setLoading(false);
        ToastAndroid.show('Business Added Sucessfully...', ToastAndroid.BOTTOM)
    }
    

  return (
    <ScrollView>
      {/* <Text>add-business</Text> */}

      <TouchableOpacity style={{
        marginTop:25,
      }}
      onPress={()=>OnImagePick()}
      >
      {!image? <Image source={require('./../../assets/images/placeholder.png')}
      style={{
        width:100,
        height:100,
        marginLeft:'35%'
      }}
      /> :
      <Image source={{uri:image}}
      style={{
        width:100,
        height:100,
        borderRadius:15,
      }}
      />
    }
    <Text style={{
      fontFamily:'outfit',
      fontSize:12,
      textAlign:'center',
      color:Colors.primary,
      marginTop:8
    }}>(Add Photo of your Shop)</Text>

      </TouchableOpacity>

      <View>

          <TextInput placeholder='Name'
          onChangeText={(v)=>setName(v)}
          style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit'
          }}
          />

          <TextInput placeholder='Address'
          onChangeText={(v)=>setAddress(v)}
          style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit'
          }}
          />

          <TextInput placeholder='Contact'
          onChangeText={(v)=>setContact(v)}
          style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit'
          }}
          />

          <TextInput placeholder='Website'
          onChangeText={(v)=>setWebsite(v)}
          style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit'
          }}
          />

          <TextInput placeholder='About'
          onChangeText={(v)=>setAbout(v)}
          multiline
          numberOfLines={5}
          style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit',
            height:100
          }}
          />

      </View>

      <View  style={{
            // padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:15,
            borderColor:Colors.gray,
            marginRight:15,
            marginLeft:15,
            fontFamily:'outfit',
            // height:100
          }}>
        <RNPickerSelect
          onValueChange={(value)=> setCategory(value)}
          items={categoryList}
          />
      </View>

      <TouchableOpacity 
      disabled={loading}
      style={{
        padding:10,
        backgroundColor:Colors.primary,
        borderRadius:5,
        marginTop:40,
        marginLeft:15,
        marginRight:15,
      }}
      onPress={()=>AddNewBusiness()}
      >
        {loading?
        <ActivityIndicator 
        size={'large'}
        color={Colors.primary}
        />:
      
        <Text style={{
          fontFamily:'outfit-medium',
          fontSize:18,
          color:'#fff',
          textAlign:'center',
        }}>Submit</Text>}
      </TouchableOpacity>

      <View style={{
        height:50
      }}>

      </View>

    </ScrollView>
  )
}