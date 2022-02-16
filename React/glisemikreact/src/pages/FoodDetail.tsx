import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResultFoods } from "../models/IFoods";
import {
  Divider,
  Image,
  Label,
  Segment,
  SemanticCOLORS,
  Icon,
} from "semantic-ui-react";

import { IFoodDetail } from "../models/IFoodDetail";

import { useParams } from "react-router-dom";

export default function FoodDetail(props) {
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState<ResultFoods>();

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
  const glycemicMessage = (index: number): string => {
    var message = "";
    if (index > 0 && index < 55) {
      message = "Bu Gıdayı gönül rahatlığıyla kullanabilirsiniz";
    } else if (index >= 55 && index < 71) {
      message = "Bu Gıdanın tüketiminde dikkatli olmak gerekir";
    } else if (index > 70 && index < 500) {
      message = "Bu Gıdanın kullanımı sıkıntılara yol açabilir";
    } else {
      message = "No Data";
    }
    return message;
  };
  const { url } = useParams();
  const URL = `/detail/${url}`;
  async function getData() {
    setIsloading(true);
    axios
      .get("http://localhost:8080/foods" + URL)
      .then((res) => {
        const dt: IFoodDetail = res.data;

        setData(dt.result);
      })
      .catch();
    setIsloading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Segment inverted>
        <Image
          className="itemImage"
          size="large"
          src={"data:image/png;base64," + data?.image}
        />

        <Divider horizontal inverted>
          <Label color={glycemicColor(data?.glycemicindex!)}>
            <h2>{data?.name}</h2>
          </Label>
        </Divider>

        <h3>{data?.detail}</h3>
        <Divider inverted />
        <Label size="large">Glisemik Index'i:</Label>
        <Icon size="big" name="long arrow alternate right"></Icon>

        <Label color={glycemicColor(data?.glycemicindex!)}>
          <h3>{data?.glycemicindex}</h3>
        </Label>
        <Icon size="big" name="long arrow alternate right"></Icon>
        <Label color="teal" size="big">
          {glycemicMessage(data?.glycemicindex!)}{" "}
        </Label>

        <Divider inverted />

        <Label size="large">Kaynak:</Label>
        <Icon size="big" name="long arrow alternate right"></Icon>

        <Label color="teal" size="large">
          {data?.source}
        </Label>

        <Divider inverted />
      </Segment>
    </div>
  );
}
