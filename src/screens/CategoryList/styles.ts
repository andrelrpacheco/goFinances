import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryIsActive {
	isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.primary};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.shape};
`

export const Category = styled.TouchableOpacity<CategoryIsActive>`
	width: 100%;
	flex-direction: row;
	align-items: center;
	padding: ${RFValue(15)}px;

	background-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.secondary_light : theme.colors.background};
`

export const IconCategory = styled(Feather)`
	font-size: ${RFValue(18)}px;
	margin-right: 16px;
`

export const NameCategory = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.title};
`

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`
