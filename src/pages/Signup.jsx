import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupPage() {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="fullname"
                placeholder="Enter Full Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Avatar</Label>
              <Input
                id="avatar"
                type="file"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Cover Image</Label>
              <Input
                id="coverImage"
                type="file"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signup
        </Button>
        <div className="w-full flex items-center justify-center">
            <CardDescription>
                Already have an account?
            </CardDescription>
            <CardAction >
                <Button variant="link">Login</Button>
            </CardAction>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}
