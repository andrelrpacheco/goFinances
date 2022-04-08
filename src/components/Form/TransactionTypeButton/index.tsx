import React from 'react'
// import { RectButtonProps } from 'react-native-gesture-handler'
import { TouchableOpacityProps } from 'react-native'

import {
	Container,
	Icon,
	Title
} from './styles'

const icons = {
	income: 'arrow-up-circle',
	outcome: 'arrow-down-circle'
}

interface TypeTransactionProps extends TouchableOpacityProps {
	type: 'income' | 'outcome';
	title: string;
	isActive: boolean;
}

export function TransactionTypeButton({
	isActive,
	title,
	type,
	...rest
}: TypeTransactionProps) {
	return (
		<Container isActive={isActive} type={type} {...rest}>
			<Icon
				name={icons[type]}
				type={type}
			/>
			<Title>{title}</Title>

		</Container>
	)
}
