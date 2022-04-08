import styled from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

interface ITransactionProps {
	type: 'income' | 'outcome';
}

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	border-radius: 5px;
	padding: 17px 24px;
	margin-top: 16px;
`

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.title};
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
`

export const Amount = styled.Text<ITransactionProps>`
	color: ${({ theme, type }) => type === 'income' ? theme.colors.success : theme.colors.attention};
	font-size: ${RFValue(20)}px;
	font-family: 'Poppins-Regular';
	margin-top: 2px;
`

export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: 19px;
`

export const Category = styled.View`
	flex-direction: row;
	align-items: center;
`

export const Icon = styled(Feather)`
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(20)}px;
`

export const CategoryName = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
	margin-left: 17px;
`

export const DataTransaction = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
`
