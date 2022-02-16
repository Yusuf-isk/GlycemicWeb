import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Grid, Header, Item, Segment, Transition } from "semantic-ui-react";
import Food from "../components/Food/Food";
import { IFoods, ResultFoods } from "../models/IFoods";
import { userFoodList } from "../services/Services";
import { CartItemType } from "../models/ISingleFood";

import { autControl } from "../utils/Util";
type Props = {
  cartItems: ResultFoods[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

export default function UserFoodList() {
  const navigate = useNavigate();
  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);

  // animation
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (autControl() === null) {
      localStorage.removeItem("user");
      localStorage.removeItem("aut");
      navigate("/");
    }
    setTimeout(() => {
      setVisible(true);
    }, 500);

    // user food list service
    toast.loading("Yükleniyor.");
    userFoodList()
      .then((res) => {
        const dt: IFoods = res.data;
        setFoodsArr(dt.result!);
        toast.dismiss();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Ürün listeleme işlemi sırasında bir hata oluştu!");
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <div style={{ margin: 5 }}>
        <Header as="h3" block>
          Eklediğiniz Gıdalar
        </Header>
        <Transition visible={visible} animation="slide down" duration={750}>
          <Segment vertical color="grey">
            Eklediğiniz gıdaların listesini ve durumlarını burada
            bulabilirsiniz.
          </Segment>
        </Transition>
      </div>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minWidth: 600,
            maxWidth: 800,
          }}
        >
          <Grid>
            <Item.Group divided>
              {foodsArr.map((item, index) => (
                <Food
                  isAdmin={false}
                  status={true}
                  key={index}
                  item={item}
                  user={item}
                  handleAddFav={() => {}}
                  handleAddToCart={() => {}}
                />
              ))}
            </Item.Group>
          </Grid>
        </div>
      </div>
    </>
  );
}
