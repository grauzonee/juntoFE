import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router"
import EventCard from "@/components/cards/EventCard"
import hero from '/hero.png'

function Hero() {
    return (
        <>
            <div className="flex flex-row items-stretch my-5 relative">
                <div className="flex flex-col text-left gap-3 w-1/2 z-20 justify-center">
                    <h1 className="text-2xl text-bold">Discover Your Community, One Event at a Time</h1>
                    <p>Join local groups, meet like-minded people, and explore events that match your passions. Adventure, learning, and friendship are just a click away.</p>
                    <Link to="/register">
                        <Button type="button">Join us</Button>
                    </Link>
                </div>
                <div className="absolute md:relative top-0 left-0 w-screen md:w-auto md:blur-0 aspect-square blur-[5px] z-10 flex-1">
                    <img src={hero} alt="junto" className="w-full h-full" />
                </div>
            </div>
            <Separator className="my-2" />
            <div className="flex w-100 flex-row gap-5">
                <EventCard />
                <EventCard />
            </div>

        </>
    )
}

export default Hero
