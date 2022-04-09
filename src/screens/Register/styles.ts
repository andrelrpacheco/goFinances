import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`

export const Form = styled.View`
	flex: 1;
	justify-content: space-between;
	width: 100%;

	padding: 24px;
`

export const Fields = styled.View``

export const TransactionTypeContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 8px;
`
