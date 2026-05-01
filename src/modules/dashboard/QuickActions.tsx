import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, UserPlus, Bell } from 'lucide-react';
import { Card, CardHeader, CardBody, Button } from '@shared/components';

const actions = [
  { label: 'View patients', icon: Users, to: '/patients' },
  { label: 'Open analytics', icon: BarChart3, to: '/analytics' },
  { label: 'Add patient', icon: UserPlus, to: '/patients' },
  { label: 'Notifications', icon: Bell, to: '/dashboard' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-slate-900">Quick actions</h2>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Button
                key={a.label}
                variant="secondary"
                onClick={() => navigate(a.to)}
                className="!h-auto !justify-start py-3"
              >
                <Icon size={16} />
                <span>{a.label}</span>
              </Button>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
