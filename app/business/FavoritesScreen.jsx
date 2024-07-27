// FavoritesScreen.js
import { View, Text, FlatList, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userFavoritesRef = doc(db, 'UserFavorites', user.id);
        const userFavoritesDoc = await getDoc(userFavoritesRef);

        if (userFavoritesDoc.exists()) {
          const userData = userFavoritesDoc.data();
          const favoriteIds = userData.favorites || [];

          // Fetch details of each favorite business
          const favoriteBusinesses = [];
          for (const id of favoriteIds) {
            const businessDoc = await getDoc(doc(db, 'BusinessList', id));
            if (businessDoc.exists()) {
              favoriteBusinesses.push(businessDoc.data());
            }
          }
          setFavorites(favoriteBusinesses);
        }
      } catch (error) {
        ToastAndroid.show('Failed to fetch Favorites', ToastAndroid.BOTTOM);
        console.error("Error fetching favorites: ", error);
      }
    };

    fetchFavorites();
  }, [user.id]);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 24 }}>{item.name}</Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>{item.address}</Text>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View>
        <Text>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}
