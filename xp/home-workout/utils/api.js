import * as Ajax from '../../../../assets/js/utils/ajax.js'

export const getChallengesList = () => Ajax.get('/xp/home-workout/api/challenges.json', {})

export const getChallengeItem = (id) => Ajax.get('/xp/home-workout/api/challenges.json', { id })
