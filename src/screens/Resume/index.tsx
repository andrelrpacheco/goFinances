import React, { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useTheme } from 'styled-components'

import { HeaderComponent } from '../../components/Header'
import { HistoryCard } from '../../components/HistoryCard'

import { categories } from '../../utils/categories';

import {
	Container,
	Content,
	ChartVictoryPie,
	MonthSelect,
	MonthSelectButton,
	MonthSelectIcon,
	Month,
	LoadContainer
} from './styles'
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
	const [selectDate, setSelectDate] = useState(new Date())
	const [historyByCategories, setHistoryByCategories] = useState<CategoryData[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const theme = useTheme()

	const loadData = async () => {
		setIsLoading(true)
		const dataKey = '@gofinances:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expensives = responseFormatted
			.filter((expensive: HistoryTransactionProps) =>
				expensive.type === 'outcome' &&
				new Date(expensive.date).getMonth() === selectDate.getMonth() &&
				new Date(expensive.date).getFullYear() === selectDate.getFullYear()
			)

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
		setIsLoading(false)
	}

	const handleDateChange = (action: 'next' | 'prev') => {
		if (action === 'next') {
			setSelectDate(addMonths(selectDate, 1))
		} else {
			setSelectDate(subMonths(selectDate, 1))
		}
	}

	useFocusEffect(useCallback(() => {
		loadData()
	}, [selectDate]))

	return (
		<Container>
			<HeaderComponent title='Resumo por categoria' />

			{isLoading ?
				<LoadContainer>
					<ActivityIndicator color={theme.colors.primary} size='large' />
				</LoadContainer> :
				<Content>

					<MonthSelect>
						<MonthSelectButton onPress={() => handleDateChange('prev')}>
							<MonthSelectIcon name='chevron-left' />
						</MonthSelectButton>

						<Month>
							{format(selectDate, 'MMMM, yyyy', { locale: ptBR })}
						</Month>

						<MonthSelectButton onPress={() => handleDateChange('next')}>
							<MonthSelectIcon name='chevron-right' />
						</MonthSelectButton>
					</MonthSelect>

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
			}
		</Container>
	)
}
