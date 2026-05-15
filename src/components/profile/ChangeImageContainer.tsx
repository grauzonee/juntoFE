import { useState, useRef, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Point, Area } from "react-easy-crop"

const img_placeholder = new URL("../../../public/img-placeholder.png", import.meta.url).href

type ChangeImageContainerProps = Readonly<{
    value?: File | null
    src?: string
    onChange: (file?: File) => void,
    aspect: number
}>

function ChangeImageContainer({
    value = null,
    src = img_placeholder,
    onChange,
    aspect
}: ChangeImageContainerProps) {
    const [currentSrc, setCurrentSrc] = useState(
        value ? URL.createObjectURL(value) : src
    )
    const [isCropping, setIsCropping] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    const onSelectFile = () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file (jpg, png, gif, etc.)")
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            return
        }

        const url = URL.createObjectURL(file)
        setSelectedImage(url)
        setIsCropping(true)
    }

    const onCropComplete = useCallback(
        (_: Area, croppedPixels: Area) => {
            setCroppedAreaPixels(croppedPixels)
        },
        []
    )

    const onCropConfirm = async () => {
        if (!croppedAreaPixels || !selectedImage) return

        const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels)

        if (croppedBlob) {
            const newFile = new File([croppedBlob], "cropped.png", {
                type: "image/png",
                lastModified: Date.now(),
            })
            onChange(newFile)
            setCurrentSrc(URL.createObjectURL(newFile))
        }

        setIsCropping(false)
    }

    const onCropCancel = () => setIsCropping(false)

    return (
        <>
            <div className="relative overflow-hidden border-2 border-border bg-violet-light shadow-brutal">
                <div className="aspect-square">
                    <img
                        src={currentSrc}
                        alt="Profile"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-end bg-black/25 px-3 py-3 backdrop-blur-[2px]">
                    <Button
                        type="button"
                        variant="neutral"
                        className="h-auto rounded-none px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-brutal-sm"
                        onClick={openFileDialog}
                    >
                        <span>Change image</span>
                        <Pencil className="size-3" />
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={onSelectFile}
                    />
                </div>
            </div>
            <Dialog open={isCropping} onOpenChange={setIsCropping}>
                <DialogContent className="max-w-2xl rounded-none border-brutal border-border bg-cream px-5 py-6 shadow-brutal-xl">
                    <DialogHeader className="border-b-2 border-border pb-4">
                        <DialogTitle className="font-heading text-2xl font-bold">Edit profile image</DialogTitle>
                    </DialogHeader>

                    <div className="flex w-full flex-col items-center gap-5">
                        <div className="relative h-[400px] w-full overflow-hidden border-2 border-border bg-card">
                            {selectedImage && <Cropper
                                image={selectedImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />}
                        </div>

                        <div className="flex flex-wrap gap-3 self-end">
                            <Button type="button" variant="neutral" onClick={onCropConfirm}>
                                Confirm
                            </Button>
                            <Button type="button" variant="secondary" onClick={onCropCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ChangeImageContainer

async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob | null> {
    const image = new Image()
    image.src = imageSrc
    await new Promise((res) => (image.onload = res))

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 1)
    })
}
