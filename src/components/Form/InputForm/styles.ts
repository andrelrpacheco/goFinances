import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
`

export const Error = styled.Text`
	font-size: ${RFValue(13)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.attention};
	margin-left: 5px;
`