"use client";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { type FullCourse } from "@/models/course";

interface Props {
  course: FullCourse | null;
}

const CourseHeader = ({ course }: Props) => {
  const t = useTranslations("Course");

  return (
    <div className="mt-5">
      <Typography variant="h4" className="font-semibold my-3">
        {course?.title}
      </Typography>
      <Typography variant="h6" className="">
        {course?.briefDescription}
      </Typography>
      <Stack spacing={2} direction="column" mt={3} className="text-base">
        <Typography>{t("total-lecture")}12</Typography>
        <Typography>{t("total-length")}11 hours, 50 minutes</Typography>
        <Typography className="flex items-center">
          {t("average-rating")}4.5
          <StarIcon />
          /5
          <StarIcon />
        </Typography>
        <Typography>{t("number-of-rating")}2</Typography>
        <Typography>{t("number-of-student")}3</Typography>
        <Typography className="pt-2 opacity-70 font-medium text-[0.8rem]">{t("last-modify")}January 8, 2023</Typography>
      </Stack>
    </div>
  );
};

export default CourseHeader;
