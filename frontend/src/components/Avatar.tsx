import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Avatar: React.FC<{ url?: string; name: string }> = ({ url, name }) => (
  url ? <img src={url} alt={name} className="w-12 h-12 rounded-full" /> : <FaUserCircle size={48} />
);

export default Avatar;