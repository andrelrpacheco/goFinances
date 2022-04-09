import React from 'react'
import { Container } from './styles'
import { HeaderComponent } from '../../components/Header'
import { HistoryCard } from '../../components/HistoryCard'

export function Resume() {
	return (
		<Container>
			<HeaderComponent title='Resumo por categoria' />

			<HistoryCard
				title='Compras'
				amount='50.50'
				color='red'
			/>
		</Container>
	)
}
