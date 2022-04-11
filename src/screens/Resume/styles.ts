import styled from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

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

export const MonthSelect = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 24px;
`

export const MonthSelectButton = styled.TouchableOpacity``

export const MonthSelectIcon = styled(Feather)`
	font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
	font-size: ${RFValue(20)}px;
	font-family: 'Poppins-Medium';
`

export const LoadContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
