import React from 'react';
import { SenderInfo } from '../services/api';
import Avatar from './Avatar';
import { formatDistanceToNow } from 'date-fns';
import api from '../services/api';
import { useQueryClient } from 'react-query';

const EmailCard: React.FC<SenderInfo> = ({ sender, count, lastDate, avatarUrl }) => {
  const queryClient = useQueryClient();
  const handleUnsub = async () => {
    await api.unsubscribe(sender);
    queryClient.setQueryData<SenderInfo[]>('emails', (old) => old?.filter((e) => e.sender !== sender));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      <div className="flex items-center space-x-4">
        <Avatar url={avatarUrl} name={sender} />
        <div>
          <div className="font-semibold">{sender}</div>
          <div className="text-sm text-gray-500">{count} emails &bull; last {formatDistanceToNow(new Date(lastDate))} ago</div>
        </div>
      </div>
      <button
        onClick={handleUnsub}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Unsubscribe
      </button>
    </div>
  );
};

export default EmailCard;