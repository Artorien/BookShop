import MyShop from "@/components/shop-component/shop";

export default function Shop() {
  return (
    <>
      <div className="py-[90px] flex justify-center items-center flex-col">
        <h1 className="text-[2rem] mb-[90px]">Shop</h1>
        <MyShop></MyShop>
      </div>
    </>
  );
}
