import React, { useEffect, useState } from "react";
import { IFoods, ResultFoods } from "../models/IFoods";
import {
  Button,
  Pagination,
  Item,
  Select,
  Grid,
  Input,
  Icon,
  Label,
} from "semantic-ui-react";
import { control, encryptData } from "../utils/Util";

import Food from "../components/Food/Food";
import { userFoodList, allFoodsList } from "../services/Services";
import axios from "axios";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { categories } from "../data/Datas";
import { ToastContainer, toast } from "react-toastify";
import { CartItemType } from "../models/ISingleFood";
import Cart from "../components/Cart/Cart";
import { UserResult } from "../models/IUser";
export default function Home() {
  const [cartItems, setCartItems] = useState([] as ResultFoods[]);
  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  const [filteredData, setFilteredData] = useState<ResultFoods[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [isloading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [postsperpage, setPostsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsperpage;
  const indexOfFirstPost = indexOfLastPost - postsperpage;
  const [selectCategory, setSelectCategory] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [user, setUser] = useState<UserResult | null>();

  const handlePaginationChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  const handleSearch = (q: string) => {
    setSearchData(q);
    setCurrentPage(1);
    const newArr = foodsArr.filter((item) =>
      item.name?.toLowerCase().includes(q)
    );
    setFilteredData(newArr);

    if (Math.round(newArr.length % postsperpage) === 0) {
      setTotalPage(newArr.length / postsperpage);
    } else {
      setTotalPage(Math.ceil(newArr.length / postsperpage));
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setCartOpen(newOpen);
  };
  //Uygulama Giriş - First mount
  useEffect(() => {
    setIsloading(true);

    userFoodList()
      .then((res) => {
        const dt: IFoods = res.data;

        setFoodsArr(dt.result!);
        setFilteredData(dt.result!);
        if (Math.round((filteredData.length %= postsperpage)) === 0) {
          setTotalPage(filteredData.length / postsperpage);
        } else {
          setTotalPage(Math.ceil(filteredData.length / postsperpage));
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("" + err);
      });

    setIsloading(false);
    const usr = control();
    if (usr !== null) {
      setUser(usr);
    }
  }, []);

  useEffect(() => {
    setTotalPage(filteredData.length);
  }, [filteredData]);

  const catOnChange = (str: string) => {
    setCurrentPage(1);
    const numCat = parseInt(str);
    setSelectCategory(numCat);

    console.log(numCat);

    var newArr: ResultFoods[] = foodsArr;
    if (numCat !== 0) {
      newArr = newArr.filter((item) => item.cid === numCat);
      console.log("filtered array size" + newArr.length);
    }

    if (searchData !== "") {
      newArr = newArr.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchData) ||
          ("" + item.glycemicindex).includes(searchData)
      );
      console.log("filtered array siz2e" + newArr.length);
    }
    setFilteredData(newArr);

    if (Math.round(newArr.length % postsperpage) === 0) {
      setTotalPage(newArr.length / postsperpage);
    } else {
      setTotalPage(Math.ceil(newArr.length / postsperpage));
    }
  };

  //Redux

  const handleAddToCart = (clickedItem: ResultFoods) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.gid === clickedItem.gid);

      if (isItemInCart) {
        return prev.map((item) =>
          item.gid === clickedItem.gid
            ? { ...item, amount: (item.amount || 1) + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleAddFav = (clickedItem: ResultFoods) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.gid === clickedItem.gid);

      if (isItemInCart) {
        return prev.map((item) =>
          item.gid === clickedItem.gid
            ? { ...item, amount: (item.amount || 1) + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.gid === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: (item.amount || 1) - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  //redux end
  return (
    <div style={{}}>
      <div
        style={{
          marginLeft: 200,
          marginBottom: 40,
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width="8">
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                fluid
                icon="search"
                placeholder="Arama..."
              />
            </Grid.Column>

            <Grid.Column width="4">
              <Select
                onChange={(e, data) => catOnChange("" + data.value)}
                fluid
                placeholder="Kategori Seç"
                options={categories}
              />
            </Grid.Column>

            {user && (
              <Grid.Row>
                <Button onClick={() => setCartOpen(true)}>
                  <Icon name="cart"></Icon>{" "}
                  <Label color="violet">{cartItems.length}</Label>
                </Button>
              </Grid.Row>
            )}
          </Grid.Row>
        </Grid>
      </div>

      <ToastContainer />
      {isloading ? (
        <div>Loading...</div>
      ) : filteredData.length === 0 ? (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <h1>No Data Found</h1>
        </div>
      ) : (
        <div>
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
              {" "}
              <Item.Group divided>
                {filteredData
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((item, index) => (
                    <Food
                      isAdmin={false}
                      status={false}
                      item={item}
                      handleAddToCart={handleAddToCart}
                      handleAddFav={handleAddFav}
                      user={user!}
                    ></Food>
                  ))}
              </Item.Group>
            </div>
          </div>
          <div
            style={{
              marginTop: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <SwipeableDrawer
                style={{}}
                onOpen={toggleDrawer(true)}
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
              >
                <Cart
                  cartItems={cartItems}
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                />
              </SwipeableDrawer>
            </div>
            <Pagination
              activePage={currentPage}
              onPageChange={handlePaginationChange}
              totalPages={filteredData.length / postsperpage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
