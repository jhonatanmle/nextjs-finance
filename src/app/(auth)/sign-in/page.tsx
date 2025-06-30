import { loginWithGithub } from '@/app/(auth)/sign-in/actions';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Github } from 'lucide-react';

const SignInPage = () => {
  return (
    <form action={loginWithGithub}>
      <div className="min-h-screen flex items-center justify-center p-3">
        <Card className="w-full max-w-sm p-6 shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-center">Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button>
              <Github strokeWidth={1.2} className="mr-2" />
              Iniciar sesión con GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default SignInPage;
