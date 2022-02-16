import { SemanticCOLORS, Item, Label, Button, Icon } from "semantic-ui-react";
import { Wrapper } from "./FoodStyle";
import { ResultFoods, ISingleFoods } from "../../models/IFoods";
import { UserResult } from "../../models/IUser";
import { adminhFoodDelete, adminWaitPushFood } from "../../services/Services";

import { Link } from "react-router-dom";
import { CartItemType } from "../../models/ISingleFood";

interface itemType {
  item: ResultFoods;
  status?: boolean;
  isAdmin?: boolean;
}
type Props = {
  item: ResultFoods;
  handleAddToCart: (clickedItem: ResultFoods) => void;
  handleAddFav: (clickedItem: ResultFoods) => void;
  user: UserResult;
  status: boolean;
  isAdmin: boolean;
};
var colorBtn: SemanticCOLORS = "red";

const glycemicColor = (index: number): SemanticCOLORS => {
  var color: SemanticCOLORS = "red";
  if (index > 0 && index < 55) {
    color = "green";
  } else if (index >= 55 && index < 71) {
    color = "orange";
  } else if (index > 70 && index < 500) {
    color = "red";
  } else {
    color = "grey";
  }
  return color;
};
// goto push
const fncPush = (user: ResultFoods) => {
  const itm = user;
  itm.enabled = true;
  adminWaitPushFood(itm)
    .then((res) => {
      const dt: ISingleFoods = res.data;
      if (dt.status === true) {
        window.location.href = "/waitFoodsList";
      }
    })
    .catch((err) => {});
};

const deleteItem = (user: ResultFoods) => {
  const itm = user;
  adminhFoodDelete(itm.gid!)
    .then((res) => {
      const dt: ISingleFoods = res.data;
      if (dt.status === true) {
        window.location.href = "/waitFoodsList";
      }
    })
    .catch((err) => {});
};
const Food: React.FC<Props> = ({
  item,
  handleAddToCart,
  handleAddFav,
  user,
  status,
  isAdmin,
}) => (
  <Item className="itemStyle">
    <Item.Image
      className="itemImage"
      size="small"
      src={"data:image/png;base64," + item.image}
    />
    {status && (
      <div style={{ marginLeft: -140, marginRight: 60 }}>
        <Label as="a" color={item.enabled === true ? "blue" : "red"} ribbon>
          {item.enabled === true ? "Yayında" : "İnceleniyor"}
        </Label>
      </div>
    )}

    <Item.Content className="content">
      <Item.Header as="a">
        <Link className="navbar-brand" to={`/detail/${item.url}`}>
          {item.name}
        </Link>
      </Item.Header>
      <Item.Meta>{item.category}</Item.Meta>
      <Item.Description>
        <Label color="grey">Glycemic Index</Label>
        <Label color={glycemicColor(item.glycemicindex!)}>
          {item.glycemicindex}
        </Label>
      </Item.Description>
      <Wrapper>
        <Item.Extra>{item.detail}</Item.Extra>
      </Wrapper>
    </Item.Content>
    <Item.Extra>
      {/* <Button onClick={() => handleAddToCart(item)}>Sepete Ekle</Button> */}

      {user && !isAdmin && (
        <>
          <Button basic as="div" labelPosition="right" color={colorBtn}>
            <Button basic color={colorBtn} onClick={() => handleAddFav(item)}>
              <Icon name="heart" />
              Favori
            </Button>
          </Button>
          <Button basic color="blue" onClick={() => handleAddToCart(item)}>
            Sepet'e Ekle
          </Button>
        </>
      )}
      {isAdmin && (
        <>
          <Button basic color="green" onClick={() => fncPush(item)}>
            <Icon name="info" />
            Yayınla
          </Button>

          <Button basic color="red" onClick={() => deleteItem(item)}>
            <Icon name="delete" />
            Sil
          </Button>
        </>
      )}
    </Item.Extra>
  </Item>
);

export default Food;
