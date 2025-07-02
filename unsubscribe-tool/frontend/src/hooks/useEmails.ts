import { useQuery, useQueryClient } from 'react-query';
import { SenderInfo } from '../services/api';
import api from '../services/api';

export function useEmails() {
  const queryClient = useQueryClient();
  return useQuery<SenderInfo[]>('emails', () => api.getEmails());
}