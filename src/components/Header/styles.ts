import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};
	width: 100%;
	height: ${RFValue(113)}px;
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 20px;
`

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.shape};
`
