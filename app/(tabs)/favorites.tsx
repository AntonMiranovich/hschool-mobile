import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { CodeComponent } from '@/components/CodeComponent';
import { useFocusEffect } from 'expo-router';

interface iDescription {
	readonly id: number
	readonly code: string
	readonly link: string[]
	readonly question: string
	readonly answer: string
}

export default function Favorites() {
	const [favorites, setFavorites] = useState<iDescription[]>([]);
	const [theme, setTheme] = useState()


	const getThemeStyle = async () => {
		const themeStyle = await AsyncStorage.getItem('theme')
		if (themeStyle) {
			setTheme(JSON.parse(themeStyle))
		}
	}


	const loadFavorites = async () => {
		try {
			const storedFavorites = await AsyncStorage.getItem('likedQuestions');
			if (storedFavorites)
				setFavorites(JSON.parse(storedFavorites));
			console.log(storedFavorites);
		} catch (error) {
			console.error('Ошибка при загрузке избранных вопросов:', error);
		}
	};



	const toggleLike = async (el: iDescription) => {
		const updatedLikes = favorites.some(likeEl => likeEl.id === el.id) ?
			favorites.filter(likeEl => likeEl.id !== el.id)
			: [...favorites, el];

		setFavorites(updatedLikes)
		await AsyncStorage.setItem('likedQuestions', JSON.stringify(updatedLikes))
		console.log(updatedLikes);

	}

	useFocusEffect(
		React.useCallback(() => {
			loadFavorites();
		}, [])
	);

	useEffect(() => {
		getThemeStyle()
	}, [])


	return (
		<ParallaxScrollView
			stateTheme={theme}
			headerBackgroundColor={{ light: '#e4edef', dark: '#353636' }}
			headerImage={
				<Ionicons size={310} name='heart' style={styles.headerImage} />
			}
		>
			<ThemedView style={ theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
				<ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type='title'>Favorites</ThemedText>

				{favorites.map((el, index) => (
					<Collapsible themeValue={theme} key={index} title={el.question}>
						<ThemedText  style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>{el.answer}</ThemedText>

						{el.code && <CodeComponent code={el.code} />}

						{el.link && el.link.map((link, linkIndex) => (
							<ExternalLink key={linkIndex} href={link}>
								<ThemedText  style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type='link'> Узнать больше #{linkIndex + 1} </ThemedText>
							</ExternalLink>
						))
						}

						<Ionicons
							size={30}
							name={favorites.some(likeEl => likeEl.id === el?.id) ? 'heart' : 'heart-outline'}
							style={styles.headerLike}
							onPress={() => toggleLike(el)}
						/>

					</Collapsible>
				))}
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#A1CEDC',
		bottom: -90,
		left: -27,
		position: 'absolute',
	},
	headerLike: {
		color: '#A1CEDC',
	}
});
