import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { Rating } from "react-native-ratings";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setuserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        Comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
      }),
    });
    ToastAndroid.show("Review added Succesfully", ToastAndroid.BOTTOM);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Reviews
      </Text>

      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder="Let us Know your thoughts"
          numberOfLines={5}
          onChangeText={(value) => setuserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.gray,
            textAlignVertical: "top",
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            fontSize: 15,
            padding: 15,
            backgroundColor: Colors.primary,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              color: "#fff",
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews?.map((item, index) => (
          <View style={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItems:'center',
            padding:10,
            borderWidth:1,
            borderColor: Colors.gray,
            borderRadius:5,
            marginTop:25,
          }}>
            <Image
              source={{ uri: item.userImage }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 99,
                marginTop:-22
              }}
            />

            <View
              style={{
                display: "flex",
                gap:5
              }}
            >
              <Text style={{
                fontFamily:'outfit-medium'
              }}>{item.userName}</Text>
              <Rating
                style={{
                  alignItems: "flex-start",
                }}
                imageSize={20}
                ratingCount={item.rating}
              />
              <Text style={{
                marginTop:10,
              }}>{item.Comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
