import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where,doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList,setBusinessList]=useState([])
  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, 'BusinessList'),
      where('category', '==', category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data())
      setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
    });
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Explore More....
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 8,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: Colors.gray,
        }}
      >
        <AntDesign
          name="search1"
          size={24}
          color={Colors.primary}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 15,
            width: 260,
          }}
        ></TextInput>
      </View>

      <Category
        explore={true}
        onCategorySelect={(category)=>GetBusinessByCategory(category)}
      />

      <ExploreBusinessList businessList={businessList}/>
    </View>
  );
}
