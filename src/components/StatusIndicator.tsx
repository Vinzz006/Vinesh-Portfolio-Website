import { cn } from '../lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'ready' | 'processing' | 'offline';
  label: string;
  sublabel?: string;
  className?: string;
}

const statusConfig = {
  online: { dotClass: 'status-online', text: 'ONLINE', color: 'text-accent-green' },
  ready: { dotClass: 'status-ready', text: 'READY', color: 'text-primary' },
  processing: { dotClass: 'status-processing', text: 'PROCESSING', color: 'text-accent-amber' },
  offline: { dotClass: 'bg-text-muted status-dot', text: 'OFFLINE', color: 'text-text-muted' },
};

export default function StatusIndicator({ status, label, sublabel, className }: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn('flex items-center gap-3 p-3 rounded-lg bg-bg-primary border border-border-subtle', className)}
      role="status"
      aria-label={`${label}: ${config.text}`}
    >
      <div className="flex-shrink-0">
        <span className={config.dotClass} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-xs text-text-secondary truncate">{label}</p>
        <p className={cn('font-mono text-xs font-semibold', config.color)}>{config.text}</p>
        {sublabel && <p className="font-mono text-[10px] text-text-muted truncate">{sublabel}</p>}
      </div>
    </div>
  );
}
