import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { useRef, useState } from "react"
import { logout, updateAccountDetailes, updateUserAvatar, changeCurrentPassword } from "@/app/slices/authSlice"
import { Camera } from "lucide-react"

function UserDashbord() {

  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    formState: { errors: errorsDetails }
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const {avatar, coverImage, email, fullname, username} = useSelector((state) => state.auth.user)
  const [isEditable, setIsEditable] = useState(false)
  const [cardHidden, setCardHidden] = useState(false)
  const avatarInputRef = useRef(null)
  const dispatch = useDispatch()

  const onSubmit = (data)=> {
    dispatch(updateAccountDetailes(data))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    dispatch(updateUserAvatar(file))
  }

  const ChangePassword = (data) => {
    dispatch(changeCurrentPassword(data))
  }

  const handleEdit = ()=> {
    setIsEditable(!isEditable)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='w-full h-[81vh] lg:h-[88vh] p-5 flex flex-col items-center justify-center gap-2'>
      <div className="relative h-[40%]">
        <div className="z-10 h-[90%] lg:w-[50vw] relative">
          <img className="h-[100%] rounded-2xl object-cover w-full" src={coverImage} alt="" />
          <button></button>
        </div>
        <div className="w-[100%] z-20 absolute bottom-0 flex items-center justify-center">
          <Avatar className="h-auto w-30 border-2">
            <AvatarImage className="object-cover" src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <input
            type="file"
            ref={avatarInputRef}
            onChange={handleAvatarChange}
            accept="image/png, image/jpeg, image/webp"
            hidden
          />

          <div onClick={() => avatarInputRef.current.click()} className="border-2 bg-neutral-400 p-2 rounded-full absolute bottom-0 right-32 lg:right-80">
            <Camera />
          </div>
        </div>
      </div>
      <div className=" w-[100%] h-[65%] flex flex-col gap-5 items-center justify-center">
          <Card hidden={cardHidden} className="w-[100%] pt-5 max-w-lg">
              <form onSubmit={handleSubmitDetails(onSubmit)} >
              <CardContent>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="username">User Name</Label>
                    <Input
                      id="username"
                      type="username"
                      readOnly={!isEditable}
                      defaultValue={username}
                      placeholder="User Name"
                      {...registerDetails("username", {required: "User Name is required"})}
                    />
                    {errorsDetails.username && <p className="text-sm font-medium text-destructive">{errorsDetails.username.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      readOnly={!isEditable}
                      defaultValue={email}
                      placeholder="m@example.com"
                      {...registerDetails("email", {required: "Email is required"})}
                    />
                    {errorsDetails.email && <p className="text-sm font-medium text-destructive">{errorsDetails.email.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      type="fullname"
                      readOnly={!isEditable}
                      defaultValue={fullname}
                      placeholder="Enter Full Name"
                      {...registerDetails("fullname", {required: "Full Name is required"})}
                    />
                    {errorsDetails.fullname && <p className="text-sm font-medium text-destructive">{errorsDetails.fullname.message}</p>}
                  </div>
                </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  {!isEditable &&<Button type="button" onClick={handleEdit} className="w-full font-bold bg-green-500">edit</Button>}
                  {isEditable && <Button type="submit" className="w-full p-2">Update Details</Button>}
                </CardFooter>
              </form>
          </Card>
          <Card hidden={!cardHidden} className="w-[100%] pt-5 max-w-lg">
              <form onSubmit={handleSubmitPassword(ChangePassword)} >
              <CardContent>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="oldPassword">Old Password</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      placeholder="Enter Old password"
                      {...registerPassword("oldPassword", {required: "Old Password is required"})}
                    />
                    {errorsPassword.oldPassword && <p className="text-sm font-medium text-destructive">{errorsPassword.oldPassword.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter New Password"
                      {...registerPassword("newPassword", {required: "New Password is required"})}
                    />
                    {errorsPassword.newPassword && <p className="text-sm font-medium text-destructive">{errorsPassword.newPassword.message}</p>}
                  </div>
                </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full p-2">Update Details</Button>
                </CardFooter>
              </form>
          </Card>
          {!cardHidden ? (
            <Button onClick={() => setCardHidden(true)} className=''>Change Password</Button>
          ):(
            <Button onClick={() => setCardHidden(false)} className="w-full">Change User Detailes</Button>
          )}
      </div>
      <div>
        <button onClick={handleLogout} className="text-red-400 p-2 rounded-2xl font-bold">Logout</button>
      </div>
    </div>
  )
}

export default UserDashbord