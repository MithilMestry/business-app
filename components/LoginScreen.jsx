import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from './../hooks/useWarmupBrowser';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const {startOAuthFlow}  = useOAuth({ strategy: "oauth_google" });

        const onPress = React.useCallback(async () => {
            console.log ('press');
        try {
          const { createdSessionId, signIn, signUp, setActive} = 
            await startOAuthFlow();
        
        if (createdSessionId) {
        setActive({session: createdSessionId});
        } else {
        // Use signIn or signup for next steps such as MFA
            }
        } catch (err) {
        
        console.error("OAuth error", err);
        }
        
    }, []);
  return (
    <View>
     <Image source={require('./../assets/images/unnamed.png')}
     style={{height:500}}/>

     <Text style={{fontFamily:'outfit-bold', 
        fontSize:30,
        textAlign:'center'}}>Your Ultimate 
        <Text style={{color:Colors.primary}}> Community Business-Book </Text>
         App
     </Text>

     <Text style={{fontFamily:'outfit-medium', 
        textAlign:'center',
        marginTop:50,
        width:320,
        left:20}}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab inventore dolor  </Text>

        <TouchableOpacity  onPress= {onPress}  style={{
            // display:'flex', 
            alignItems:'center',
            marginTop:20,
            padding:20,
            left:55,
            backgroundColor:Colors.primary, 
            borderRadius:50,
            width:250,
           
            }}>

            <Text style={{color:'#ffff', }}>Let's get Started</Text>
        </TouchableOpacity>
    </View>
  )
}