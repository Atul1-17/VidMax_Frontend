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
import { registerUser } from "../app/slices/authSlice"

export function Signup() {

  const navigate = useNavigate()
  const {status, error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    
    const formData = new FormData()
    
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("fullname", data.fullname)
    formData.append("avatar", data.avatar[0])
    formData.append("coverImage", data.coverImage[0])
    formData.append("password", data.password)

    dispatch(registerUser(formData))
  }

  return (
    <div className=" w-full h-screen flex items-center justify-center">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <CardContent>
          <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter Username"
                {...register("username", {required: "Username is required"})}
              />
              {errors.username && <p className="text-sm font-medium text-destructive">{errors.username.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {required: "Email is required"})}
              />
              {errors.email && <p className="text-sm font-medium text-destructive">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="fullname"
                placeholder="Enter Full Name"
                {...register("fullname", {required: "Full Name is required"})}
              />
              {errors.fullname && <p className="text-sm font-medium text-destructive">{errors.fullname.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Avatar</Label>
              <Input
                id="avatar"
                type="file"
                {...register("avatar", {required: "Cover Image is required"})}
              />
              {errors.avatar && <p className="text-sm font-medium text-destructive">{errors.avatar.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Cover Image</Label>
              <Input
                id="coverImage"
                type="file"
                {...register("coverImage", {required: "Cover Image is required"})}
              />
              {errors.coverImage && <p className="text-sm font-medium text-destructive">{errors.coverImage.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register("password", 
                  {
                    required: "Password is required",
                    minLength: {value: 8, message: "Password must be at least 8 charecters"}
                  }
                )}
              />
              {errors.password && <p className="text-sm font-medium text-destructive">{errors.password.message}</p>}
            </div>
          </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {status === "Loading" ? "Signing up..." : "Signup" }
            </Button>
            {status === 'failed' && <p className="text-sm font-medium text-destructive">{error}</p>}
            <div className="w-full flex items-center justify-center">
                <CardDescription>
                    Already have an account?
                </CardDescription>
                <CardAction >
                    <Button variant="link" onClick={()=> navigate("/login")}>Login</Button>
                </CardAction>
            </div>
          </CardFooter>
        </form>
    </Card>
    </div>
  )
}
