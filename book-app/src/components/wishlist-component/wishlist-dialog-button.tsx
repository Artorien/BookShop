import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { clearTheWishlist } from "@/lib/data";
import { setClearWishList } from "@/redux/slice";
import { WishlistInterfaceButton } from "@/types/wishlist-dialog-button";
import { useDispatch } from "react-redux";

export default function WishListButton(properties: WishlistInterfaceButton) {
  const dispatch = useDispatch();

  const handleDelete = async (token: string) => {
    await clearTheWishlist(token);
    dispatch(setClearWishList(true));
  };

  return (
    <Dialog>
      <DialogTrigger>
          <button className="border border-red-600 rounded-xl py-1 px-4 mt-[5px] w-[135px] text-sm  text-red-600 hover:bg-red-600">
            Remove all
          </button>
      </DialogTrigger>
      <DialogContent className="z-10px">
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
