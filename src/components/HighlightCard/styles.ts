import styled, { css } from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
	type: 'income' | 'outcome' | 'total'
}

export const Container = styled.View<TypeProps>`
	width: ${RFValue(300)}px;
	background-color: ${({ theme, type }) =>
		type === 'total' ? theme.colors.secondary : theme.colors.shape};

	border-radius: 5px;
	padding: 19px 24px;
	padding-bottom: ${RFValue(42)}px;
	margin-right: 16px;
`

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
	color: ${({ theme, type }) =>
		type === 'total' ? theme.colors.shape : theme.colors.title};
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';
`

export const Icon = styled(Feather) <TypeProps>`
	font-size: ${RFValue(40)}px;
	${({ type }) => type === 'income' && css`
		color: ${({ theme }) => theme.colors.success}
	`}

	${({ type }) => type === 'outcome' && css`
		color: ${({ theme }) => theme.colors.attention}
	`}

	${({ type }) => type === 'total' && css`
		color: ${({ theme }) => theme.colors.shape}
	`}
`

export const Footer = styled.View`
	margin-top: ${RFValue(56)}px;
`

export const Amount = styled.Text<TypeProps>`
	color: ${({ theme, type }) =>
		type === 'total' ? theme.colors.shape : theme.colors.title};
	font-size: ${RFValue(32)}px;
	font-family: 'Poppins-Medium';
`

export const LastTransaction = styled.Text<TypeProps>`
	color: ${({ theme, type }) =>
		type === 'total' ? theme.colors.shape : theme.colors.text};
	font-size: ${RFValue(12)}px;
	font-family: 'Poppins-Regular';
`
