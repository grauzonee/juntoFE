function ImageContainer({ src }: { src: string }) {
    return (
        <div className="rounded-sm shadow overflow-hidden w-full max-h-80">
            <img
                src={src}
                alt="Event"
                className="w-full object-center h-auto"
            />
        </div>

    )
}
export default ImageContainer
