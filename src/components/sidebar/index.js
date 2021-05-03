import UseUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const {
    user: { fullName, userName, userId }
  } = UseUser();

  return (
    <div className="p-4">
      <User userName={userName} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}
