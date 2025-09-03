import { useState, useRef, useEffect } from "react";
import Croppie from "croppie";
import "croppie/croppie.css";
import ImageContainer from "@/components/ImageContainer";
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { type CroppieOptions } from "croppie";
import img_placeholder from '/img-placeholder.png'

const windowWidth = window.innerWidth

const croppieOptions: CroppieOptions = {
    showZoomer: true,
    enableOrientation: true,
    mouseWheelZoom: "ctrl",
    viewport: { width: 200, height: 200, type: "square" },
    boundary: { width: windowWidth > 480 ? 400 : 300, height: 400 }
};

function ChangeImageContainer({ src = img_placeholder }: { src?: string }) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isCropping, setIsCropping] = useState(false);
    const croppieRef = useRef<Croppie | null>(null);
    const croppieContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const onSelectFile = () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file (jpg, png, gif, etc.)");
            fileInputRef.current!.value = "";
            return;
        }

        setIsCropping(true);
    };

    useEffect(() => {
        if (isCropping && croppieContainerRef.current && fileInputRef.current?.files?.[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(fileInputRef.current.files[0]);
            reader.onload = () => {
                croppieRef.current = new Croppie(croppieContainerRef.current!, croppieOptions);
                croppieRef.current.bind({ url: reader.result as string });
            };
        }

        return () => {
            croppieRef.current?.destroy();
            croppieRef.current = null;
        };
    }, [isCropping]);

    const onCropConfirm = async () => {
        if (!croppieRef.current) return;

        const base64 = await croppieRef.current.result({
            type: "base64",
            size: "viewport",
            format: "png",
            quality: 1,
        });

        setCurrentSrc(base64);
        setIsCropping(false);
    };

    const onCropCancel = () => setIsCropping(false);

    return (
        <div className="relative">
            <ImageContainer src={currentSrc}>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-gray-800/80 flex items-end justify-end p-2">
                    <Button variant="link" className="text-primary-foreground text-xs" onClick={openFileDialog}>
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
            </ImageContainer>

            {isCropping && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 max-w-lg w-full flex flex-col items-center">
                        <div
                            ref={croppieContainerRef}
                            className="w-full"
                            style={{ height: "400px" }}
                        ></div>

                        <div className="flex gap-2 mt-12">
                            <Button onClick={onCropConfirm}>Confirm</Button>
                            <Button variant="secondary" onClick={onCropCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChangeImageContainer;
