import { SemanticCOLORS , Item ,Label} from 'semantic-ui-react'

import { ResultFoods } from '../../models/IFoods';
import { Link } from "react-router-dom";


type Props = {
  item: ResultFoods;
  
};
const glycemicColor = ( index:number ): SemanticCOLORS => {
  var color:SemanticCOLORS = 'red'
  if ( index > 0 && index < 56 ) {
      color = 'green'
  }else if ( index > 55 && index < 71 ) {
      color = 'orange'
  }else if ( index > 70) {
      color = 'red'
  }
  return color;
}
const Food: React.FC<Props> = ({ item }) => (
  
  <Item className='itemStyle'>
  <Item.Image size='small' src={item.image}/>

  <Item.Content>
    <Item.Header as='a'><Link className="navbar-brand" to={`/detail/${item.url}`}>
    {item.name}
      </Link></Item.Header>
    <Item.Meta>{item.category}</Item.Meta>
    <Item.Description>
      <Label color='black' >
        Glycemic Index
      </Label>
    <Label color={ glycemicColor(item.glycemicindex!) }>
   {item.glycemicindex}
      </Label>
     
      
    
    </Item.Description>
    <Item.Extra>{item.detail}</Item.Extra>
  </Item.Content>
</Item>
);

export default Food;
