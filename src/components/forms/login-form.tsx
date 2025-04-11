import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { loginAsync } from "@/services/user-service";
import React from "react";
import { Loader2 } from "lucide-react";

type LoginFormType = React.ComponentPropsWithoutRef<"div"> & {
  authReqId: string | null;
};

export function LoginForm({ authReqId, className, ...props }: LoginFormType) {
  const [isLoading, setIsLoading] = React.useState(false);
  const signIn = useSignIn();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const { content, errors } = await loginAsync(
        values.username,
        values.password,
        authReqId
      );

      if (errors.length > 0) {
        toast("Login failed", {
          description: errors,
        });
        return;
      }

      const isSignedIn = signIn({
        auth: {
          token: content.access.token,
          type: "Bearer",
        },
        refresh: content.refresh.token,
        userState: { ...content.user },
      });

      if (!isSignedIn) {
        toast("Login failed", {
          description: "Error signing in",
        });
      }
      setIsLoading(false);

      window.location.href = content.redirectUrl ?? "/";
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Gimmco Assist account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Username, Email, or Phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter you password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 size={16} className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        Login
                      </span>
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
