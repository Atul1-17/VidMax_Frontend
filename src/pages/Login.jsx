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
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {loginUser} from "../app/slices/authSlice"
import { useEffect } from "react"


export function Login() {

  const navigate = useNavigate()
  const {status, error, isAuthenticated} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const {register, handleSubmit, formState: {errors}} = useForm()

  // Redirect to home page when login is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-5">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>

      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {required: "Email is required"})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/change_password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register("password", {required: "Password is required"})} 
              />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {status === "loading" ? "Loging..." : "Login"}
        </Button>
        {status === 'failed' && <p className="text-sm font-medium text-destructive">{error}</p>}
        <div className="w-full flex items-center justify-center">
            <CardDescription>
                Does not have account?
            </CardDescription>
            <CardAction >
                <Button variant="link" onClick={()=> navigate("/signup")}>Sign Up</Button>
            </CardAction>
        </div>
      </CardFooter>
      </form>
    </Card>
    </div>
  )
}
