import { CodeComponent } from '@/components/CodeComponent'
import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import storage from '../storage/index.json'

import cssImage from '@/assets/images/css.png'
import htmlImage from '@/assets/images/html.png'
import javascriptImage from '@/assets/images/javascript.png'
import nosqlImage from '@/assets/images/mongo-db.png'
import nodejsImage from '@/assets/images/nodejs.png'
import reactImage from '@/assets/images/react.png'
import sqlImage from '@/assets/images/sql.png'
import typescriptImage from '@/assets/images/typescript.png'
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

interface iDescription {
	readonly id: number
	readonly code: string
	readonly link: string[]
	readonly question: string
	readonly answer: string
}

interface iTopic {
	readonly assets: string
	readonly description: iDescription[]
}

const topicImageMap: Record<string, any> = {
	HTML: htmlImage,
	CSS: cssImage,
	JavaScript: javascriptImage,
	TypeScript: typescriptImage,
	React: reactImage,
	SQL: sqlImage,
	noSQL: nosqlImage,
	'Node.js': nodejsImage,
}

export default function DescriptionScreen() {
	const { topic } = useLocalSearchParams()
	const [activeTopic, setActiveTopic] = useState<iTopic>()
	const [likedQuestions, setLikedQuestions] = useState<iDescription[]>([])
	const [theme, setTheme] = useState()
	const [searchQuery, setSearchQuery] = useState('')


	const getThemeStyle = async () => {
		const themeStyle = await AsyncStorage.getItem('theme')
		if (themeStyle) {
			setTheme(JSON.parse(themeStyle))
		}
	}

	const filteredDescriptions =
		activeTopic?.description.filter(el =>
			el.question.toLowerCase().includes(searchQuery.toLowerCase())
		) || []

		

	const loadLikedQuestions = async () => {
		const storedLikes = await AsyncStorage.getItem('likedQuestions')
		if (storedLikes) {
			setLikedQuestions(JSON.parse(storedLikes))
		}
	}

	const toggleLike = async (el: iDescription) => {
		const updatedLikes = likedQuestions.some(likeEl => likeEl.id === el.id) ?
			likedQuestions.filter(likeEl => likeEl.id !== el.id)
			: [...likedQuestions, el];

		setLikedQuestions(updatedLikes)
		await AsyncStorage.setItem('likedQuestions', JSON.stringify(updatedLikes))
		console.log(updatedLikes);

	}


	useEffect(() => {
		setActiveTopic(storage[topic])
		loadLikedQuestions()
		getThemeStyle()
	}, [topic])



	return (
		<ParallaxScrollView
			stateTheme={theme}
			headerBackgroundColor={{ light: '#bde1eb', dark: '#473c1d' }}
			headerImage={
				<Image source={topicImageMap[topic]} style={styles.topicImage} />
			}
		>
			<ThemedView style={[styles.titleContainer, theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }]}>
				<ThemedText type='title' style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>{topic}</ThemedText>
			</ThemedView>

			<TextInput
				style={styles.searchInput}
				placeholder='Поиск по вопросам...'
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{filteredDescriptions.map((el, index: number) => (
				<Collapsible themeValue={theme} key={index} title={el.question}>
					<ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>{el.answer}</ThemedText>

					{el.code && <CodeComponent code={el.code} />}

					{el.link &&
						el.link.map(
							(el, index) =>
								el && (
									<ExternalLink key={index} href={el}>
										<ThemedText type='link'>
											Узнать больше #{index + 1}
										</ThemedText>
									</ExternalLink>
								)
						)}
					<Ionicons
						size={30}
						name={likedQuestions.some(likeEl => likeEl.id === el.id) ? 'heart' : 'heart-outline'}
						style={styles.headerImage}
						onPress={() => toggleLike(el)}
					/>
				</Collapsible>
			))
			}
		</ParallaxScrollView >
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: 'white'
	},
	topicImage: {
		height: 250,
		width: 250,
		position: 'absolute',
		left: '20%',
	},
	headerImage: {
		color: '#A1CEDC',
	},
	searchInput: {
		height: 40,
		borderColor: '#A1CEDC',
		borderWidth: 1,
		margin: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
})