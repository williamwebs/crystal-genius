"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface VideoPlayerDialogProps {
  videoSrc: string;
  children: ReactNode;
}

export function VideoPlayerDialog({ videoSrc, children }: VideoPlayerDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="!max-w-4xl !w-full p-0 overflow-hidden" showCloseButton={true}>
        <DialogTitle className="sr-only">Video Player</DialogTitle>
        <div className="relative w-full aspect-video">
          <video
            className="max-w-4xl w-full h-full object-cover"
            controls={false}
            autoPlay
            playsInline
            muted
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
