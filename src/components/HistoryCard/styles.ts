import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

interface ContainerHistoryProps {
	color: string;
}

export const Container = styled.View<ContainerHistoryProps>`
	background-color: ${({ theme }) => theme.colors.shape};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 13px 24px;
	border-radius: 5px;
	border-left-width: 4px;
	border-left-color: ${({ color }) => color};

	margin: 0 24px;
	margin-bottom: 8px;
`

export const Title = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: 'Poppins-Regular';
	color: ${({ theme }) => theme.colors.title};
`

export const Amount = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: 'Poppins-Bold';
	color: ${({ theme }) => theme.colors.title};
`
