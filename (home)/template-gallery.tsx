"use client";

import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { templates } from "@/constants/templates";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export const TemplateGallery = ()=>{
    const router = useRouter();
    const create = useMutation(api.documents.create);
  const [isCreating,setIsCreating]=useState(false);
    
  const onTemplateClick = (title:string,initialContent:string)=>{
    setIsCreating(true);
    create({title,initialContent})
    .catch(()=>toast.error("Something went weong"))
    .then((documentId)=>{
        toast.success("Document created")
        router.push(`/documents/${documentId}`);
    })
    .finally(()=>{
        setIsCreating(false);
    });
  };
  //bg-[#E4B1F0]
    return(
        <div className="bg-[#E4B1F0] pt-3 pb-3">
          <div className="max-w-screen-xl bg-[#FFE1FF] mx-auto px-24 py-11 flex flex-col gap-y-4 rounded-full">
          <h3 
  className="font-sans font-semibold text-lg "
  style={{color:"#4B0082", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
  >Start a new document</h3>
            <Carousel>
                <CarouselContent className="-ml-4">
                   {templates.map((template)=>(
                    <CarouselItem
                    key={template.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 
                    2xl:basis-[14.285714%]
                    pl-4 " 
                    >
                     <div
                     className={cn(
                        "aspect-[3/4] flex flex-col gap-y-2.5",
                        isCreating && "pointer-events-none opacity-50"
                     )}
                     >
                        <button
                        disabled={isCreating}
                        onClick={()=>onTemplateClick(template.label,template.initialContent)}
                        style={{
                            backgroundImage:`url(${template.imageUrl})`,
                            backgroundSize:"cover",
                            backgroundPosition:"center",
                            backgroundRepeat:"no-repeat",
                        }}
                        className="size-full hover:border-2 hover:border-[#BA55D3] rounded-sm border border-gray-200 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"

                        />
                        <p className="text-sm font-medium truncate "   style={{color:"#4B0082", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                        >
                                {template.label}
                            </p>

                     </div>
                    </CarouselItem>
                   ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext/>
                
            </Carousel>
          </div>
        </div>
    );
};