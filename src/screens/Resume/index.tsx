import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import { VictoryPie } from 'victory-native'

import { HeaderComponent } from '../../components/Header'
import { HistoryCard } from '../../components/HistoryCard'

import { categories } from '../../utils/categories';

import { Container, Content, ChartVictoryPie } from './styles'
interface HistoryTransactionProps {
	type: 'income' | 'outcome';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface CategoryData {
	key: string;
	name: string;
	totalFormatted: string;
	total: number;
	color: string;
	percent: string;
}

export function Resume() {
	const [historyByCategories, setHistoryByCategories] = useState<CategoryData[]>([])
	const theme = useTheme()


	const loadData = async () => {
		const dataKey = '@gofinances:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expensives = responseFormatted
			.filter((expensive: HistoryTransactionProps) => expensive.type === 'outcome')

		const expensivesTotal = expensives
			.reduce((acc: number, expensive: HistoryTransactionProps) => {
				return acc + Number(expensive.amount)
			}, 0)

		let totalByCategory: CategoryData[] = []

		categories.forEach((category) => {
			let categorySum = 0

			expensives.forEach((expensive: HistoryTransactionProps) => {
				if (expensive.category === category.key) {
					categorySum += Number(expensive.amount)
				}
			})

			if (categorySum > 0) {
				const totalFormatted = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				})

				const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

				totalByCategory.push({
					key: category.key,
					name: category.name,
					totalFormatted,
					total: categorySum,
					color: category.color,
					percent
				})
			}
		})

		setHistoryByCategories(totalByCategory)
	}

	useEffect(() => {
		loadData()
	}, [])
	return (
		<Container>
			<HeaderComponent title='Resumo por categoria' />

			<Content>

				<ChartVictoryPie>
					<VictoryPie
						data={historyByCategories}
						colorScale={historyByCategories.map(category => category.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
								fill: theme.colors.shape
							}
						}}
						labelRadius={75}
						x='percent'
						y='total'
					/>
				</ChartVictoryPie>

				{
					historyByCategories.map(item => (
						<HistoryCard
							key={item.key}
							title={item.name}
							amount={item.totalFormatted}
							color={item.color}
						/>
					))
				}
			</Content>

		</Container>
	)
}
