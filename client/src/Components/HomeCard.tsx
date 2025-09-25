import type React from "react"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

interface CommunityCardProp {
    Desc: string,
    Name: string,
    Img: string,
    link: string
}
const HomeCard: React.FC<CommunityCardProp> = ({ Name, Desc, Img, link }) => {
    return (
        <>
            <Card className="flex text-white bg-background/20 wrap">
                <CardHeader className="flex items-center ">
                    <img src={Img} alt={Name} className="size-10 rounded-full justify-end" />
                    <CardTitle>{Name}</CardTitle>
                </CardHeader>
                <p className="">{Desc}</p>

                <CardFooter>
                    <Button>
                        <Link to={link}>Join</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default HomeCard
