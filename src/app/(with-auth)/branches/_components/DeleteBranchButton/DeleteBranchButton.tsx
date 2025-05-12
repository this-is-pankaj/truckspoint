'use client'
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type DeleteBranchButtonProps = {
  branchId: string;
  onDelete: (branchId: string) => void;
}

const DeleteBranchButton = ({ branchId, onDelete }: DeleteBranchButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="cursor-pointer text-red-500 hover:bg-transparent hover:text-red-600 transition-all duration-300 ease-in"
      onClick={() => {
        onDelete(branchId);
      }}
    >
      <TrashIcon />
    </Button>
  )
}
export default DeleteBranchButton;