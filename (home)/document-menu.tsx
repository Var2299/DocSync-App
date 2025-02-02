import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DocumentIdPage from "../documents/[documentId]/page";

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
    const handleOpenInNewTab = (documentId: Id<"documents">) => {
        const documentUrl = `/documents/${documentId}`;
        window.open(documentUrl, "_blank"); 
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDialog documentId={documentId} initialTitle={title}>
                   
                     <button
                              
                              onClick={(e) => e.stopPropagation()}
                              onSelect={(e) => e.preventDefault()}

                              className=
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-purple-100 w-full"
                            
                            style={{color:"#4B0082",fontFamily: '"Comic Sans MS", cursive, sans-serif'}}
                    
                              >
                                <img src="/RenameDocument.png" alt="" height={23} width={23}/>
                                <span className="text-sm">Rename</span>
                              </button>
                </RenameDialog>
                <RemoveDialog documentId={documentId}>
                <button
                              
                              onClick={(e) => e.stopPropagation()}
                              onSelect={(e) => e.preventDefault()}

                              className=
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-purple-100 w-full"
                            
                            style={{color:"#4B0082",fontFamily: '"Comic Sans MS", cursive, sans-serif'}}
                    
                              >
                                <img src="/RemoveDocument.png" alt="" height={23} width={23}/>
                                <span className="text-sm">Remove</span>
                              </button>
                </RemoveDialog>
                <button
                              
                              onClick={(e) => {
                                e.stopPropagation();  // Prevent event from bubbling
                                handleOpenInNewTab(documentId); // Open in new tab
                            }}
                              className=
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-purple-100 w-full"
                            
                            style={{color:"#4B0082",fontFamily: '"Comic Sans MS", cursive, sans-serif'}}
                    
                              >
                                <img src="/open.png" alt="" height={23} width={23}/>
                                <span className="text-sm">Open in a new tab</span>
                              </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
