import React from 'react'
import {
	Header,
	Title
} from './styles'

export function HeaderComponent({ title }) {
	return (
		<Header>
			<Title>{title}</Title>
		</Header>
	)
}
