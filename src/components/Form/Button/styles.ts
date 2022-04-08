import styled from 'styled-components/native';
//import { RectButton } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.secondary};
	padding: 18px;
	align-items: center;
	border-radius: 5px;
`

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Medium';
	color: ${({ theme }) => theme.colors.shape};
`
