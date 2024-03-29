import styled, { css } from 'styled-components/native'
//import { RectButton } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

interface IconProps {
	type: 'income' | 'outcome';
}

interface ContainerProps {
	isActive: boolean;
	type: 'income' | 'outcome';
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
	width: 48%;

	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 18px 37px;
	border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.text};
	border-radius: 5px;

	${({ isActive, type }) => isActive && type === 'outcome' && css`
		background-color: ${({ theme }) => theme.colors.attention_light};
	`};

	${({ isActive, type }) => isActive && type === 'income' && css`
		background-color: ${({ theme }) => theme.colors.success_light};
	`};
`

// export const Button = styled(RectButton)``

export const Icon = styled(Feather) <IconProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 14px;
	color: ${({ theme, type }) =>
		type === 'income' ? theme.colors.success : theme.colors.attention};
`

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: 'Poppins-Regular';

`
