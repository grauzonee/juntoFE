import event_example from "/event_example.jpg"
import ImageContainer from "@/components/ImageContainer"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AttendiesCarousel from "@/components/AttendiesCarousel"
import GroupInfoSidebar from "@/components/GroupInfoSidebar"

function SingleEvent() {
    return (
        <>
            <div className="border-b mb-[3rem] shadow-b py-[2rem] text-center w-full sticky top-0 bg-white/20 z-20 h-24 relative">
                <p className="text-2xl font-bold">September challenge: 3-Hour Art Focus Inspired by book: Four Thousand Weeks</p>
            </div>
            <div className="w-full flex flex-col md:flex-row md:gap-5">
                <div className="md:flex-1 flex flex-col gap-3">
                    <ImageContainer src={event_example} />
                    <div className="w-full flex flex-col gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae odio ac magna facilisis tempor et at mi. Fusce eu erat in tortor ullamcorper suscipit sit amet euismod tortor. Morbi egestas ullamcorper purus nec facilisis. Nullam a velit finibus nisl tincidunt maximus. Phasellus sapien quam, cursus dignissim neque nec, eleifend varius nisi. Donec molestie eros eget magna cursus volutpat. Nulla nec neque sit amet nisi bibendum bibendum ut vitae turpis.

                                Nunc convallis urna et auctor elementum. Integer feugiat sit amet purus in aliquam. Nunc eget semper nibh. Donec at varius quam. Aliquam ac nisl id risus pretium accumsan a imperdiet tellus. Mauris nec leo non dui sollicitudin scelerisque. Etiam blandit dui ac arcu pretium suscipit ut vitae augue. Etiam pretium purus ipsum, sed blandit arcu cursus at. Donec aliquam, libero blandit tempor scelerisque, neque felis semper lacus, nec mattis orci eros quis purus. Vestibulum euismod ipsum libero, vel tincidunt arcu mattis at.

                                Integer commodo ipsum id tortor dignissim, a luctus lorem lacinia. Nulla urna nibh, mollis in nulla vitae, lacinia egestas est. Curabitur vitae dui tellus. Proin quis tincidunt sem, nec interdum dui. Vivamus eu lacinia ligula. Praesent laoreet lectus in congue egestas. Vestibulum tempus pellentesque nulla ac scelerisque. Proin consequat nibh risus, ut ultricies est vehicula iaculis. Sed imperdiet nunc quis elit viverra, quis dignissim arcu malesuada. Donec fringilla urna urna, a rhoncus magna tincidunt eu. Nam vitae enim rhoncus, fringilla ligula cursus, elementum lorem. Etiam sed mauris metus. Etiam consequat consequat massa, a tempus mi accumsan eget.

                                Sed dapibus lorem at sodales congue. Curabitur tempor orci ut venenatis cursus. Donec vestibulum purus quis quam fermentum, id tristique nisi semper. Curabitur volutpat dolor quis tincidunt gravida. Praesent sed dignissim velit, ut pharetra quam. Duis vel aliquet felis. Aenean malesuada diam neque, in tincidunt dui vehicula nec. Nulla facilisis id urna fermentum consequat. In rhoncus posuere metus vel facilisis.

                                Aliquam malesuada aliquam consequat. Donec sodales ornare augue, in convallis eros molestie vel. Praesent tempor lorem sit amet mollis venenatis. Aenean urna elit, ullamcorper at porta eu, fermentum vel augue. Ut bibendum quam vel lacus mattis ornare. Maecenas rutrum cursus nibh, ut sollicitudin purus vulputate id. Fusce sed mauris ac magna porttitor rutrum non nec justo. Vivamus id cursus enim. In neque turpis, mattis ut dui at, facilisis viverra purus. Pellentesque commodo pulvinar dapibus. Integer nec sodales orci. Morbi vitae posuere ex. Quisque aliquam, nisl eget sagittis elementum, nunc felis placerat libero, in laoreet leo urna sit amet ex. </CardContent>
                            <CardFooter>
                                <p className="text-xs">Mon, Sep 1 · 12:50 PM GMT+2</p>
                            </CardFooter>
                        </Card>
                        <AttendiesCarousel />
                    </div>
                </div>
                <div className="w-full md:w-1/3 text-center flex flex-row md:flex-col sticky md:top-24 bottom-0 gap-3 py-2 px-1 h-fit">
                    <GroupInfoSidebar />
                </div>
            </div>
        </>
    )
}

export default SingleEvent
