import React from 'react'
import { Platform } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'
import { Resume } from '../screens/Resume'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
	const theme = useTheme()
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.secondary,
				tabBarInactiveTintColor: theme.colors.text,
				tabBarLabelPosition: 'beside-icon',
				tabBarStyle: {
					height: 88,
					paddingVertical: Platform.OS === 'ios' ? 15 : 0
				}
			}}
		>
			<Screen
				name="Listagem"
				component={Dashboard}
				options={{
					tabBarIcon: (({ size, color }) =>
						<FeatherIcon
							name='list'
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Screen
				name="Cadastrar"
				component={Register}
				options={{
					tabBarIcon: (({ size, color }) =>
						<FeatherIcon
							name='dollar-sign'
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Screen
				name="Resumo"
				component={Resume}
				options={{
					tabBarIcon: (({ size, color }) =>
						<FeatherIcon
							name='pie-chart'
							size={size}
							color={color}
						/>
					)
				}}
			/>
		</Navigator>
	)
}
