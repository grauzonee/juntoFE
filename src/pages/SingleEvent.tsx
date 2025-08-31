function SingleEvent() {
    return (
        <>
            <div className="bg-gray-600 h-5 text-center w-full sticky top-0">INFO</div>
            <div className="w-full flex flex-col md:flex-row">
                <div className="md:flex-1 bg-emerald-400 text-center">
                    <div className="bg-violet-500 w-full h-[15rem] text-center">IMAGE</div>
                    <div className="bg-yellow-500 w-full flex flex-col">
                        <div className="h-[20rem] w-full bg-blue-200">DESCRIPTION</div>
                        <div className="h-[7rem] w-full bg-lime-200">ATTENDIES</div>
                        <div className="h-[12rem] w-full bg-navy-200">MAP</div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 bg-rose-400 text-center flex flex-row md:flex-col sticky md:top-5 bottom-0 gap-3 py-2 px-1 h-fit">
                    <div className="h-[5rem] bg-orange-200 text-center w-1/4 md:w-full">GROUP INFO</div>
                    <div className="h-[5rem] text-center flex flex-row md:flex-col w-full justify-between items-center gap-1 items-stretch">
                        <div className="bg-rose-100 h-[2rem]">BLOCK</div>
                        <div className="bg-rose-100 h-[2rem]">BLOCK</div>
                        <div className="bg-rose-100 h-[2rem]">BLOCK</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEvent
