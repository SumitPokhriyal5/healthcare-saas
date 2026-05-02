import { Bell, BellOff, BellRing, Check } from 'lucide-react';
import { Card, CardHeader, CardBody, Button, Badge } from '@shared/components';
import { useNotifications } from '@lib/notifications/useNotifications';

export function NotificationsCard() {
  const { permission, enable, notify } = useNotifications();

  const triggerSample = () => {
    void notify({
      title: 'Critical alert: Rohan Mehta',
      body: 'Heart rate elevated above threshold. Tap to view patient.',
      url: '/patients/p002',
      tag: 'patient-alert',
    });
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-slate-500" />
            <h2 className="font-semibold text-slate-900">Alerts</h2>
          </div>
          <PermissionBadge permission={permission} />
        </div>
      </CardHeader>
      <CardBody>
        {permission === 'unsupported' && (
          <p className="text-sm text-slate-500">Your browser doesn't support notifications.</p>
        )}

        {permission === 'denied' && (
          <p className="text-sm text-slate-500">
            Notifications are blocked. Re-enable them in your browser settings to receive critical
            patient alerts.
          </p>
        )}

        {permission === 'default' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              Enable browser notifications to get critical patient alerts even when this tab isn't
              focused.
            </p>
            <Button onClick={() => void enable()} className="w-full">
              <BellRing size={16} />
              Enable notifications
            </Button>
          </div>
        )}

        {permission === 'granted' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">You'll receive critical alerts as they happen.</p>
            <Button variant="secondary" onClick={triggerSample} className="w-full">
              <BellRing size={16} />
              Trigger sample alert
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function PermissionBadge({
  permission,
}: {
  permission: ReturnType<typeof useNotifications>['permission'];
}) {
  if (permission === 'granted') {
    return (
      <Badge tone="success" className="gap-1">
        <Check size={12} /> Enabled
      </Badge>
    );
  }
  if (permission === 'denied') {
    return (
      <Badge tone="danger" className="gap-1">
        <BellOff size={12} /> Blocked
      </Badge>
    );
  }
  if (permission === 'unsupported') {
    return <Badge tone="neutral">Unsupported</Badge>;
  }
  return <Badge tone="warning">Off</Badge>;
}
