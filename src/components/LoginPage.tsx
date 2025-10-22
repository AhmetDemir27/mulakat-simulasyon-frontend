import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Google'ın backend'deki giriş endpoint'inin tam adresi
const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-md bg-slate-900 border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Hoş Geldiniz!</CardTitle>
        <CardDescription className="text-slate-400">
          Başlamak için lütfen Google hesabınızla giriş yapın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Buton aslında backend'deki adrese giden bir link */}
        <a href={GOOGLE_AUTH_URL} className="w-full">
          <Button className="w-full bg-white text-slate-900 hover:bg-slate-200">
            {/*  */}
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.2 0 128.5 110.3 18.2 244 18.2c67.3 0 121.3 24.8 165.7 67.4l-64 63.8c-28.5-27-61.3-41.8-101.7-41.8-83.3 0-151.3 67.8-151.3 151.5s68 151.5 151.3 151.5c97.3 0 131.3-69.1 135.8-104.2H244V261.8h244z"></path>
            </svg>
            Google ile Giriş Yap
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default LoginPage;