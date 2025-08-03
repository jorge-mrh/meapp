import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
  component: SignupComponent,
});

function SignupComponent() {
  const { signUp, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password);
    // After signUp, check if there was no error to show the confirmation message
    const state = useAuthStore.getState();
    if (!state.error) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center pt-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <p>Please check your email to confirm your registration.</p>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                  {error && <p className="text-destructive">{error.message}</p>}
                </div>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?
                <Link to="/login" className="underline ml-2">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
