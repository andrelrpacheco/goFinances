import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionList,
	LogoutButton,
	LoadContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
	id: string;
}

interface HighlightProps {
	amount: string;
	lastTransaction: string;
}

interface HighlightData {
	entries: HighlightProps;
	expensives: HighlightProps;
	total: HighlightProps;
}

export function Dashboard() {
	const [transactions, setTransactions] = useState<DataListProps[]>([])
	const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
	const [loading, setLoading] = useState(true)

	const theme = useTheme()

	function getLastTransactionDate(
		collection: DataListProps[],
		type: 'income' | 'outcome'
	) {
		const lastTransaction = new Date(
			Math.max.apply(Math, collection
				.filter(transaction => transaction.type === type)
				.map(transaction => new Date(transaction.date).getTime())))

		return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
			'pt-BR', { month: 'long' })}`
	}

	async function loadTransaction() {
		const dataKey = '@gofinances:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const transactions = response ? JSON.parse(response) : []

		let entriesTotal = 0
		let expensivesTotal = 0

		const transactionFormatted: DataListProps[] = transactions
			.map((item: DataListProps) => {
				if (item.type === 'income') {
					entriesTotal += Number(item.amount)
				} else {
					expensivesTotal += Number(item.amount)
				}

				const amount = Number(item.amount).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				})

				const date = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit'
				}).format(new Date(item.date))

				return {
					id: item.id,
					amount,
					name: item.name,
					type: item.type,
					category: item.category,
					date
				}
			})

		setTransactions(transactionFormatted)

		const lastTransactionEntries = getLastTransactionDate(transactions, 'income')
		const lastTransactionExpensives = getLastTransactionDate(transactions, 'outcome')
		const intervalTransactions = `01 a ${lastTransactionExpensives}`

		const total = entriesTotal - expensivesTotal
		setHighlightData({
			entries: {
				amount: entriesTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: `Última entrada dia ${lastTransactionEntries}`
			},
			expensives: {
				amount: expensivesTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: `Última saída dia ${lastTransactionExpensives}`
			},
			total: {
				amount: total.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: intervalTransactions
			}
		})
		setLoading(false)
	}

	useEffect(() => {
		loadTransaction()
	}, [])

	useFocusEffect(useCallback(() => {
		loadTransaction()
	}, []))

	return (
		<Container>
			{
				loading ?
					<LoadContainer>
						<ActivityIndicator color={theme.colors.primary} size='large' />
					</LoadContainer> :
					<>
						<Header>
							<UserWrapper>
								<UserInfo>
									<Photo
										source={{ uri: 'https://avatars.githubusercontent.com/u/50774983?v=4' }}
									/>

									<User>
										<UserGreeting>Olá, </UserGreeting>
										<UserName>André</UserName>
									</User>
								</UserInfo>

								<LogoutButton onPress={() => { }}>
									<Icon name='power' />
								</LogoutButton>
							</UserWrapper>
						</Header>

						<HighlightCards>
							<HighlightCard
								title='Entradas'
								amount={highlightData.entries.amount}
								lastTransaction={highlightData.entries.lastTransaction}
								type='income'
							/>
							<HighlightCard
								title='Saídas'
								amount={highlightData.expensives.amount}
								lastTransaction={highlightData.expensives.lastTransaction}
								type='outcome'
							/>
							<HighlightCard
								title='Total'
								amount={highlightData.total.amount}
								lastTransaction={highlightData.total.lastTransaction}
								type='total'
							/>
						</HighlightCards>

						<Transactions>
							<Title>Listagem</Title>
							<TransactionList
								data={transactions}
								keyExtractor={item => item.id}
								renderItem={({ item }) => <TransactionCard data={item} />}
							/>
						</Transactions>
					</>
			}
		</Container>
	)
}
