import {
  SemanticCOLORS,
  Item,
  Label,
  Button,
  Icon,
  Grid,
} from "semantic-ui-react";

import { ResultFoods } from "../../models/IFoods";
import { Link } from "react-router-dom";
import { CartItemType } from "../../models/ISingleFood";

type Props = {
  item: ResultFoods;
  handleAddToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const glycemicColor = (index: number): SemanticCOLORS => {
  var color: SemanticCOLORS = "red";
  if (index > 0 && index < 55) {
    color = "green";
  } else if (index >= 55 && index < 71) {
    color = "orange";
  } else if (index > 70) {
    color = "red";
  }
  return color;
};

const CartItem: React.FC<Props> = ({
  item,
  removeFromCart,
  handleAddToCart,
}) => (
  <Item className="itemStyle">
    <Grid.Row>
      <Grid.Column>
        <Item.Image
          className="itemImage"
          size="small"
          src={"data:image/png;base64," + item.image}
        />
      </Grid.Column>
      <Item.Header as="a">
        <Link className="navbar-brand" to={`/detail/${item.url}`}>
          {item.name}
        </Link>
      </Item.Header>
    </Grid.Row>

    <Grid.Column>
      <Item.Content>
        <div style={{ marginTop: 5 }}></div>

        <Item.Meta>{item.category}</Item.Meta>
        <Grid.Row>
          <Label color={"grey"}>Index:</Label>
          <Label color={glycemicColor(item.glycemicindex!)}>
            {item.glycemicindex}
          </Label>
        </Grid.Row>
        <div style={{ marginTop: 5 }}></div>
        <Grid.Row>
          <Label color={"grey"}>Total:</Label>
          <Label color={glycemicColor(item.glycemicindex!)}>
            {item.amount}
          </Label>
        </Grid.Row>
        <Item.Description></Item.Description>
      </Item.Content>
    </Grid.Column>

    <br></br>
    <Item.Extra>
      <Button basic color="blue" onClick={() => handleAddToCart(item)}>
        <Icon name="add circle"></Icon> İlave Yap
      </Button>
      <Button basic color="red" onClick={() => removeFromCart(item.gid || 0)}>
        <Icon name="minus circle"></Icon>
        Değeri eksilt
      </Button>
    </Item.Extra>
    <div style={{ marginBottom: 20 }}></div>
    <hr></hr>
  </Item>
);

export default CartItem;
