import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
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

export async function updateFollowingUser(
  loggedInUserDocId, // currently logged in user document id (shawn's profile)
  suggestedUserProfileId, // the user that shawn requests to follow
  isFollowingProfile // true/false (am I currently following this person)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(suggestedUserProfileId)
        : FieldValue.arrayUnion(suggestedUserProfileId)
    });
}

export async function updateFollowedUser(suggestedProfileDocId, loggedInUserId, isFollower) {
  return firebase
    .firestore()
    .collection('users')
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollower
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId)
    });
}

export async function toggleFollow(
  loggedInUserDocId,
  loggedInUserId,
  suggestedProfileDocId,
  suggestedUserProfileId,
  isFollowingProfile
) {
  await updateFollowingUser(loggedInUserDocId, suggestedUserProfileId, isFollowingProfile);
  await updateFollowedUser(suggestedProfileDocId, loggedInUserId, isFollowingProfile);
}

export async function getPhotos(userId, following) {
  const results = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = results.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      // raphael
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}
