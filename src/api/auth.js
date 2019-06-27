/* globals firebase */

export const login = ({ email, password }) => firebase.auth().signInWithEmailAndPassword(email, password)
export const register = ({ email, password }) => firebase.auth().createUserWithEmailAndPassword(email, password)
