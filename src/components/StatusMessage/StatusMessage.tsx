import React from 'react';
import { StatusMessage as StatusMessageType } from '../../types';
import './StatusMessage.css';

interface StatusMessageProps {
  status: StatusMessageType | null;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (!status) return null;

  return <div className={`status-message ${status.type}`}>{status.message}</div>;
};
