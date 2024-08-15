import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import PriceBox from "../common/price-box";
import UserRating from "./user-rating";
import { type ICourseContent } from "@/types/course";

const CourseContent = (props: ICourseContent) => {
  return (
    <React.Fragment>
      <Link href={"/"}>
        <Typography component="div" className="font-semibold text-lg">
          {props.title}
        </Typography>
      </Link>
      <Typography component="div" className="text-base my-2">
        {props.author}
      </Typography>
      <UserRating rating={props.rating} />
      <PriceBox price={props.price} discount={props.discount} />
    </React.Fragment>
  );
};

export default CourseContent;
