import 'react-native-gesture-handler'
import React from 'react'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components'

import theme from './src/global/styles/theme'
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<AppRoutes />
			</NavigationContainer>
		</ThemeProvider>
	)
}
