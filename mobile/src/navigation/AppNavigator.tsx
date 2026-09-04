import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens/HomeScreen'
import { FightersScreen } from '../screens/FightersScreen'
import { RankingsScreen } from '../screens/RankingsScreen'
import { TournamentsScreen } from '../screens/TournamentsScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { THEME } from '../constants/theme'
import { Home, Users, Trophy, Swords } from 'lucide-react-native'

const Tab = createBottomTabNavigator()

// Mock user logged-in avatar
const USER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#090d16',
          borderTopColor: 'rgba(255, 255, 255, 0.08)',
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#e11d48',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="Võ sĩ"
        component={FightersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="BXH"
        component={RankingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="Giải đấu"
        component={TournamentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Swords size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.avatarContainer, focused && styles.avatarFocused]}>
              <Image source={{ uri: USER_AVATAR }} style={styles.avatarImg} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFocused: {
    borderColor: '#e11d48',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
})
