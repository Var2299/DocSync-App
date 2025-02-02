import { Doc } from "../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // "asc" or "desc"
  const [sortedDocuments, setSortedDocuments] = useState<Doc<"documents">[]>(documents || []);

  // Update sortedDocuments whenever documents change
  useEffect(() => {
    if (documents) {
      setSortedDocuments(documents);
    }
  }, [documents]);

  const sortDocuments = (order: "asc" | "desc") => {
    if (!documents) return;

    const sorted = [...documents].sort((a, b) => {
      const dateA = new Date(a._creationTime).getTime();
      const dateB = new Date(b._creationTime).getTime();

      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedDocuments(sorted);
    setSortOrder(order);
  };

  return (
    <div className="bg-[#E4B1F0] ">
      <div className="max-w-screen-xl bg-[#FFE1FF]  mx-auto px-24 py-6 flex flex-col  gap-5 rounded-2xl">
        {documents === undefined ? (
          <div className="flex justify-center items-center h-24">
            <LoaderIcon className="animate-spin text-muted-foreground size-5" />
          </div>
        ) : (
          <Table
            className="text-sm "
            style={{
              color: "#4B0082",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-purple-800 font-extrabold">Name</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell text-purple-800 font-extrabold">
                  Shared
                </TableHead>
                <TableHead className="hidden md:table-cell text-purple-800 font-extrabold">
                  Created at
                </TableHead>
                <TableHead className=" ">
                  <button
                     title="Sort"
                    onClick={() => sortDocuments(sortOrder === "asc" ? "desc" : "asc")}
                    className={cn(
                                "h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-100 ml-auto",
                            )}
                  >
                           <img src="/sort.png" alt="" width={30} height={30}/>
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            {sortedDocuments.length === 0 ? (
              <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-purple-900">
                  No documents found
                  </TableCell>  
              </TableRow>
          </TableBody>
            ) : (
              <TableBody>
                {sortedDocuments.map((document: Doc<"documents">) => (
                  <DocumentRow key={document._id} document={document} />
                ))}
              </TableBody>
            )}
          </Table>
        )}
        <div className="flex items-center justify-center ">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => loadMore(5)}
            disabled={status !== "CanLoadMore"}
          >
            {status === "CanLoadMore" ? (
              <span
                className="text-sm"
                style={{
                  color: "#4B0082",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                }}
              >
                Load more
              </span>
            ) : (
              <span
                className="text-sm"
                style={{
                  color: "#4B0082",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                }}
              >
                End of results
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
