import { Application } from "@/types";
import { Link } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { BiDownload, BiLock, BiLockOpen, BiMessageRounded } from "react-icons/bi";
import { BsPersonFill, BsStarFill } from "react-icons/bs";
import { FaPhone, FaWhatsappSquare } from "react-icons/fa";
import { FaMapLocationDot, FaSquarePersonConfined } from "react-icons/fa6";
import { GiAges, GiGraduateCap } from "react-icons/gi";
import { PiHandbagFill } from "react-icons/pi";
import { RiMailFill } from "react-icons/ri";
import CountryFlag from "react-country-flag";
import Button from "./ui/Button";

type Props = {
  application: Application;
};

export default function ApplicationCard({ application }: Props) {
  const [isLocked, setIsLocked] = useState(application.state === "locked");
  return (
    <div className="border border-secondary p-6 text-xs">
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Image
          alt=""
          className="mx-auto h-24 min-w-24 rounded-full object-cover object-top"
          height={100}
          src={application.applicant.imgUrl}
          width={100}
        />
        <div className="flex-grow">
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex-grow">
              <div className="flex w-full justify-between">
                <div className="flex gap-2 text-2xl font-semibold">
                  {application.applicant.name}
                  {isLocked ? (
                    <BiLock className="fill-red-600" size={24} />
                  ) : (
                    <BiLockOpen className="fill-primary" size={24} />
                  )}
                </div>
                <span className="text-red-500">Applied {moment(application.appliedDate).fromNow()}</span>
              </div>
              <div className="mb-2 flex items-start">
                <div className="grid flex-grow grid-cols-2 items-start gap-2 text-strong-subtext lg:grid-cols-3">
                  <div className="flex items-start gap-4">
                    <FaMapLocationDot className="fill-primary" size={20} />
                    {application.applicant.location}
                  </div>
                  <div className="flex items-start gap-4">
                    <GiAges className="fill-primary" size={20} />
                    {application.applicant.age} years old
                  </div>
                  <div className="flex items-start gap-4">
                    <FaSquarePersonConfined className="fill-primary" size={20} />
                    {application.applicant.experienceYears} years Experience
                  </div>
                  <div className="flex items-start gap-4">
                    <GiGraduateCap className="fill-primary" size={20} />
                    {application.applicant.degree}
                  </div>
                  <div className="flex items-start gap-4">
                    <BsPersonFill className="fill-primary" size={20} />
                    {application.applicant.careerLevel}
                  </div>
                  <div className="flex items-start gap-4">
                    <PiHandbagFill className="fill-primary" size={20} />
                    {application.applicant.field}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center gap-2 sm:block sm:flex-row">
              <div className="flex items-center gap-4 sm:mb-2">
                <Link
                  className="border border-secondary p-1.5"
                  href={`https://wa.me/${application.applicant.phone}`}
                  target="_blank"
                >
                  <FaWhatsappSquare className="fill-green-400" size={16} />
                </Link>
                <div className="border border-secondary p-1.5">
                  <BiMessageRounded className="fill-primary" size={16} />
                </div>
                <div className="border border-secondary p-1.5">
                  <BsStarFill className="fill-primary" size={16} />
                </div>
              </div>
              {isLocked ? (
                <Button onClick={() => setIsLocked(false)}>Unlock Profile</Button>
              ) : (
                <Link
                  className="flex w-36 items-center gap-2 border border-primary-shade px-3 py-1.5 font-semibold text-primary-shade no-underline"
                  download
                  href={application.applicant.cvUrl}
                >
                  <span>Download CV</span>
                  <BiDownload size={20} />
                </Link>
              )}
            </div>
          </div>
          <div className="mb-4 flex flex-wrap bg-primary-highlight">
            <div className="w-1/3 min-w-fit p-2 font-semibold">Contact Info.</div>
            {isLocked ? (
              <div className="w-1/2 p-2 text-red-600">Click Unlock profile to view contact information</div>
            ) : (
              <>
                <div className="flex w-1/3 min-w-fit items-center gap-1 p-2 font-semibold">
                  <FaPhone className="rotate-90 fill-primary" size={14} />
                  {application.applicant.phone}
                </div>
                <div className="flex w-1/3 min-w-fit items-center gap-1 p-2 font-semibold">
                  <RiMailFill className="fill-primary" size={14} />
                  {application.applicant.email}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-1.5 bg-secondary-highlight p-4">
        {application.applicant.experience.map((exp, index) => (
          <div className="grid grid-cols-4 gap-1 sm:grid-cols-5" key={index}>
            <div className="col-span-2 font-bold sm:col-span-3">{exp.title}</div>
            <div className="order-2 w-28 border border-subtext bg-white p-0.5 ps-2">
              <CountryFlag className="me-2 rounded-md text-base" countryCode={exp.country.code} svg />
              <span className="text-[10px]">{exp.country.name}</span>
            </div>
            <div className="col-span-2 flex justify-end text-subtext sm:col-span-1">
              <div className="w-20 text-start">
                ({exp.yearFrom === exp.yearTo ? exp.yearFrom : `${exp.yearFrom} - ${exp.yearTo}`})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
