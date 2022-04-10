import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`
export const Content = styled.ScrollView.attrs({
	contentContainerStyle: { padding: 24 }
})``

export const ChartVictoryPie = styled.View`
	width: 100%;
	align-items: center;
`
