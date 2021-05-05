import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  const profiles = result.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id
    }))
    .filter((user) => user.userId !== userId && !following.includes(user.userId));

  return profiles;
}

export async function setFollowingUser(loggedInUserDocId, followingId) {
  const userRef = firebase.firestore().collection('users').doc(loggedInUserDocId);
  userRef.update({
    following: FieldValue.arrayUnion(followingId)
  });

  return false;
}

export async function setFollowedUser(userId, followedId) {
  const userRef = firebase.firestore().collection('users').doc(userId);
  userRef.update({
    followers: FieldValue.arrayUnion(followedId)
  });
  return false;
}
