import React from 'react';

interface SystemCommandProps {
  command: string;
  status: 'active' | 'idle' | 'critical';
}

const SystemCommand: React.FC<SystemCommandProps> = ({ command, status }) => {
  return (
    <div className={`system-command-display ${status}`}>
      <span className="command-label">CMD:</span>
      <code className="command-text">{command}</code>
    </div>
  );
};

export default SystemCommand;