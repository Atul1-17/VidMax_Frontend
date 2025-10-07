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

function ChangePassword() {

    const {status, error} = useSelector((state) => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = () => {

    }


  return (
    <div className="w-full h-screen flex items-center justify-center p-5">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>change password</CardTitle>
        <CardDescription>
          Enter your current and new password
        </CardDescription>

      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Current password</Label>
              <Input
                id="currentPass"
                type="password"
                placeholder="Current password"
                {...register("currentPass", {required: "Current password is required"})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">New password</Label>
              </div>
              <Input 
                id="newPass" 
                type="password" 
                placeholder="New password"
                {...register("newPass", {required: "New password is required"})} 
              />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {status === "loading" ? "Loging..." : "change password"}
        </Button>
        {status === 'failed' && <p className="text-sm font-medium text-destructive">{error}</p>}
      </CardFooter>
      </form>
    </Card>
    </div>
  )
}

export default ChangePassword