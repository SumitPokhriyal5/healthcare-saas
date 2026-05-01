import AuthBootstrap from '@modules/auth/AuthBootstrap';
import AppRouter from '@routes/AppRouter';

export default function App() {
  return (
    <AuthBootstrap>
      <AppRouter />
    </AuthBootstrap>
  );
}
