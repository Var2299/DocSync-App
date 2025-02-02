import { TableCell,TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import {differenceInHours,format} from "date-fns";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps{
    document:Doc<"documents">;
};

export const DocumentRow = ({document}:DocumentRowProps)=>{

    const router = useRouter();


    return(
        <TableRow
        onClick={()=>router.push(`/documents/${document._id}`)}
        className="cursor-pointer"
        >
          <TableCell className="w-[50px]">
            <img src="/WS3.png" alt="logo"  width={30} height={30} />
                 
          </TableCell>
          <TableCell className="font-medium md:w-[45%]"   style={{color:"#4B0082", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
          >{document.title}

          </TableCell>
          <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
         {document.organizationId
         ?<img src="/org.png" alt="" height={30} width={30}/>

         :<img src="/user.png" alt="" height={30} width={30}/>}
         {document.organizationId?
                  <span style={{color:"#4B0082"}}>Organization</span>
                  :<span style={{color:"#4B0082"}}>Personal</span>
         
         }
         
          </TableCell>
          <TableCell style={{color:"#4B0082"}} className="text-muted-foreground hidden md:table-cell">
          {(() => {
    const creationTime = new Date(document._creationTime);
    const now = new Date();

    const hoursDifference = differenceInHours(now, creationTime);

    if (hoursDifference < 24) {
      return format(creationTime, "hh:mm a");
    }

    return format(creationTime, "MMM dd, yyyy");
  })()}
         </TableCell>
         <TableCell  className="flex justify-end ">
            <DocumentMenu
            
             documentId = {document._id}
             title={document.title}
             onNewTab={()=>{    window.open(`/documents/${document._id}`,"_blank");
            }}
            />
         </TableCell>
        </TableRow> 
    )
}
