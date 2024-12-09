import { DialogInterface } from "@/types/wishlist-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { clearTheWishlist } from "@/lib/data";
import { useDispatch } from "react-redux";
import { setClearWishList } from "@/redux/slice";

export default function WishlistDialog(properties: DialogInterface) {
  const dispatch = useDispatch();

  const handleDelete = async (token: string) => {
    await clearTheWishlist(token);
    dispatch(setClearWishList(true));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <motion.div
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, x: -20 * (properties.data.length + 1) }}
          animate={{ opacity: 1, x: 0 }}
          className="flex border rounded-xl px-[20px] py-[7px] justify-start items-center w-[170px] mb-[15px] text-[1rem] cursor-pointer text-red-600"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </div>
          <p className="ml-[10px]">Remove all</p>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            All items will be removed from your wishlist permanently.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose>
            <button className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          </DialogClose>
          <DialogClose>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={() => handleDelete(properties.jwtToken)}
            >
              Confirm
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
