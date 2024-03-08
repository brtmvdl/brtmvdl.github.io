import * as Ajax from '../../../assets/js/utils/ajax.js'

export const getChallengesList = () => Ajax.get('/api/home-workout/challenges.json', {})

export const getChallengeItem = (id) => Ajax.get('/api/home-workout/challenges.json').then(({ list }) => Array.from(list).find((c) => c.id === id))

export const getWorkoutList = () => Ajax.get('/api/home-workout/workouts.json')
