import styled from 'styled-components/native'
// import { RectButton } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity.attrs({
	activeOpacity: 0.7
})`
	background-color: ${({ theme }) => theme.colors.shape};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: 5px;
	margin-top: 16px;
	padding: 18px 16px;
`

export const Category = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.text};
`

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};
`
