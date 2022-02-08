import { Image, Item } from 'semantic-ui-react'

import { ResultFoods } from '../../models/IFoods';


type Props = {
  item: ResultFoods;
  
};

const Food: React.FC<Props> = ({ item }) => (
  <Item >
  <Item.Image size='small' src={item.image}/>

  <Item.Content>
    <Item.Header as='a'>{item.name}</Item.Header>
    <Item.Meta>Description</Item.Meta>
    <Item.Description>
      index:{item.glycemicindex}
    </Item.Description>
    <Item.Extra>Additional Details</Item.Extra>
  </Item.Content>
</Item>
);

export default Food;
