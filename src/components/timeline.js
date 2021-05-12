/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  // we need to get the logged in users's photos (hook)
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (create a post component)
  // if the user has no photos, tell them to create some photos
  return (
    <div className="container col-span-2">
      {!photos ? (
        <div>
          <Skeleton count={4} width={640} height={400} className="mb-5" />
        </div>
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <div className="container col-span-2">
          <p>You should like some photos</p>
        </div>
      )}
    </div>
  );
}

/* <div>
{photos.map((photo) => (
  <PhotoCard
    key={photo.docId}
    username={photo.username}
    imageSrc={photo.imageSrc}
    caption={photo.caption}
    comments={photo.comments}
    likes={photo.likes}
  />
))}
</div> */
