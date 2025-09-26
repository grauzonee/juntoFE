import { useState, useRef, useCallback } from "react"
import Cropper from "react-easy-crop"
import ImageContainer from "@/components/ImageContainer"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import img_placeholder from "/img-placeholder.png"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Point, Area } from "react-easy-crop"

type ChangeImageContainerProps = {
    value?: File | null
    src?: string
    onChange: (file?: File) => void,
    aspect: number
}

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
            fileInputRef.current!.value = ""
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
            <ImageContainer src={currentSrc}>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-gray-800/80 flex items-end justify-end p-2">
                    <div className="flex flex-row text-sm items-center gap-1">
                        <Button
                            type="button"
                            variant="link"
                            className="text-primary-foreground text-xs"
                            onClick={openFileDialog}
                        >
                            <p>Change image</p>
                            <Pencil className="h-2" />
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
            </ImageContainer>
            <Dialog open={isCropping} onOpenChange={setIsCropping}>
                <DialogContent className="px-4">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                    </DialogHeader>

                    <div className="bg-white rounded-lg p-4 max-w-lg w-full flex flex-col items-center">
                        <div className="relative w-full h-[400px]">
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

                        <div className="flex gap-2 mt-12">
                            <Button type="button" onClick={onCropConfirm}>
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
