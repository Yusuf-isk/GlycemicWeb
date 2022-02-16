import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Grid, Header, Item, Segment, Transition } from "semantic-ui-react";
import Food from "../components/Food/Food";
import { IFoods, ResultFoods } from "../models/IFoods";
import { adminWaitFoodList, userFoodList } from "../services/Services";
import { autControl, control } from "../utils/Util";

export default function AdminPage() {
  const navigate = useNavigate();
  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  var isAdmin = false;

  // animation
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const usr = control();
    if (usr !== null) {
      usr.roles!.forEach((item) => {
        if (item.name === "admin") {
          isAdmin = true;
        }
      });
    }

    if (autControl() === null || isAdmin === false) {
      localStorage.removeItem("user");
      localStorage.removeItem("aut");
      navigate("/");
    }
    setTimeout(() => {
      setVisible(true);
    }, 500);

    // user food list service
    toast.loading("Yükleniyor.");
    adminWaitFoodList()
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
      <Header as="h3" block>
        Kullanıcıdan Gelen Gıdalar
      </Header>
      <Transition visible={visible} animation="slide down" duration={750}>
        <Segment vertical color="grey">
          Kullanıcıdan gelen, Onay bekleyen gıdalar.
        </Segment>
      </Transition>

      <div
        style={{
          marginTop: 20,
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
          <Item.Group divided>
            {foodsArr.map((item, index) => (
              <Food
                handleAddFav={() => {}}
                user={item}
                handleAddToCart={() => {}}
                key={index}
                item={item}
                status={true}
                isAdmin={true}
              />
            ))}
          </Item.Group>
        </div>{" "}
      </div>
    </>
  );
}
