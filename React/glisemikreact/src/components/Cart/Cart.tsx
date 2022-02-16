import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./CartStyle";
import { CartItemType } from "../../models/ISingleFood";
import { ResultFoods } from "../../models/IFoods";
import { Label } from "semantic-ui-react";
type Props = {
  cartItems: ResultFoods[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce(
      (ack: number, item) =>
        ack + (item.amount || 1) * (item.glycemicindex || 1),
      0
    );

  return (
    <Wrapper>
      <h2>Sepetim</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.gid}
          item={item}
          handleAddToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Label color="violet">
        <h2>Total: {calculateTotal(cartItems)}</h2>{" "}
      </Label>
    </Wrapper>
  );
};
export default Cart;
