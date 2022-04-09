import React from 'react'
import { FlatList } from 'react-native'
import { categories } from '../../utils/categories'
import { Button } from '../../components/Form/Button'
import { HeaderComponent } from '../../components/Header'

import {
	Container,
	Header,
	Title,
	Category,
	IconCategory,
	NameCategory,
	Separator,
	Footer
} from './styles'

interface CategoryListProps {
	key: string;
	name: string;
}

interface Props {
	category: CategoryListProps;
	setCategory: (category: CategoryListProps) => void;
	closeCategoryModal: () => void;
}

export function CategoryList({
	category,
	setCategory,
	closeCategoryModal
}: Props) {

	function handleCategorySelect(category: CategoryListProps) {
		setCategory(category)
	}

	return (
		<Container>
			<HeaderComponent title='Categoria' />

			<FlatList
				data={categories}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
					>
						<IconCategory name={item.icon} />
						<NameCategory>{item.name}</NameCategory>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>

			<Footer>
				<Button
					title='Selecionar'
					onPress={closeCategoryModal}
				/>
			</Footer>
		</Container>
	)
}
