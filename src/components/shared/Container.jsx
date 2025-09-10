import { Separator } from "../ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"


export function Container(
  {
    className,
    Data,
  }
) {
  return (
    Data.map((vid) => (
      <Card key={vid.title} className={`w-full max-w-sm ${className}`}>
      {vid.image ? (
        <CardContent >
        <img src={vid.image} alt="" />
      </CardContent>
      ) : (null)}
      <Separator />
      <CardFooter className="pt-2 flex flex-col gap-2 items-start">
        <CardTitle>{vid.title}</CardTitle>
        <CardDescription>
          {vid.discription}
        </CardDescription>
      </CardFooter>
    </Card>
    ))
  )
}
