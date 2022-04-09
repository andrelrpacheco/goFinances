import React, { useState } from 'react'
import {
	Modal,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import {
	useNavigation,
	NavigationProp,
	ParamListBase
} from '@react-navigation/native'

import { Button } from '../../components/Form/Button'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { CategoryList } from '../CategoryList'
import { HeaderComponent } from '../../components/Header'

import {
	Container,
	Form,
	Fields,
	TransactionTypeContainer
} from './styles'

export type FormData = {
	[name: string]: any;
}

const schema = yup.object({
	name: yup
		.string()
		.required('Nome é obrigatório'),
	amount: yup
		.number()
		.typeError('Informe um valor numerico')
		.positive('Informe um valor positivo')
		.required('O preço é obrigatório')
})

export function Register() {
	const [transactionType, setTransactionType] = useState('')
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria'
	})
	const { control, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const { navigate }: NavigationProp<ParamListBase> = useNavigation()

	function handleTransactionTypeSelect(type: 'income' | 'outcome') {
		setTransactionType(type)
	}

	function handleOpenModalCategory() {
		setCategoryModalOpen(true)
	}

	function handleCloseModalCategory() {
		setCategoryModalOpen(false)
	}

	async function handleRegister(form: FormData) {
		if (!transactionType)
			return Alert.alert('Selecione o tipo da transação!')

		if (category.key === 'category')
			return Alert.alert('Selecione uma categoria!')

		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date()
		}

		try {
			const dataKey = '@gofinances:transactions'
			const data = await AsyncStorage.getItem(dataKey)
			const currentData = data ? JSON.parse(data) : []

			const dataFormatted = [
				...currentData,
				newTransaction
			]

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

			reset()
			setTransactionType('')
			setCategory({
				key: 'category',
				name: 'Categoria'
			})

			navigate('Listagem')

		} catch (error) {
			console.log(error)
			Alert.alert('Não foi possível enviar os dados!')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<HeaderComponent title='Cadastro' />
				<Form>
					<Fields>
						<InputForm
							name='name'
							control={control}
							placeholder='Nome'
							autoCapitalize='sentences'
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							name='amount'
							control={control}
							placeholder='Preço'
							keyboardType='numeric'
							error={errors.amount && errors.amount.message}
						/>

						<TransactionTypeContainer>
							<TransactionTypeButton
								type='income'
								title='Entrada'
								onPress={() => handleTransactionTypeSelect('income')}
								isActive={transactionType === 'income'}
							/>
							<TransactionTypeButton
								type='outcome'
								title='Saída'
								onPress={() => handleTransactionTypeSelect('outcome')}
								isActive={transactionType === 'outcome'}
							/>
						</TransactionTypeContainer>

						<CategorySelect
							title={category.name}
							onPress={handleOpenModalCategory}
						/>
					</Fields>


					<Button
						title='Enviar'
						onPress={handleSubmit(handleRegister)}
					/>
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategoryList
						category={category}
						setCategory={setCategory}
						closeCategoryModal={handleCloseModalCategory}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	)
}
