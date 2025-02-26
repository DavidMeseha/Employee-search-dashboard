import { Application } from "@/types";
import { Link } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { useState, memo } from "react";
import { BiDownload, BiLock, BiLockOpen, BiMessageRounded } from "react-icons/bi";
import { BsPersonFill, BsStarFill } from "react-icons/bs";
import { FaPhone, FaWhatsappSquare } from "react-icons/fa";
import { FaMapLocationDot, FaSquarePersonConfined } from "react-icons/fa6";
import { GiAges, GiGraduateCap } from "react-icons/gi";
import { PiHandbagFill } from "react-icons/pi";
import { RiMailFill } from "react-icons/ri";
import CountryFlag from "react-country-flag";
import Button from "./ui/Button";

type InfoItemProps = {
  icon: React.ReactNode;
  text: string;
};

const InfoItem = memo(function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      {text}
    </div>
  );
});

type ActionButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

const ActionButton = memo(function ActionButton({ icon, onClick }: ActionButtonProps) {
  return (
    <div className="border border-secondary p-1.5" onClick={onClick}>
      {icon}
    </div>
  );
});

type ExperienceItemProps = {
  title: string;
  country: { code: string; name: string };
  yearFrom: number;
  yearTo: number;
};

const ExperienceItem = memo(function ExperienceItem({ title, country, yearFrom, yearTo }: ExperienceItemProps) {
  return (
    <div className="grid grid-cols-4 gap-1 sm:grid-cols-5">
      <div className="col-span-2 font-bold sm:col-span-3">{title}</div>
      <div className="order-2 w-28 border border-subtext bg-white p-0.5 ps-2">
        <CountryFlag className="me-2 rounded-md text-base" countryCode={country.code} svg />
        <span className="text-[10px]">{country.name}</span>
      </div>
      <div className="col-span-2 flex justify-end text-subtext sm:col-span-1">
        <div className="w-20 text-start">({yearFrom === yearTo ? yearFrom : `${yearFrom} - ${yearTo}`})</div>
      </div>
    </div>
  );
});

type Props = {
  application: Application;
};

export default function ApplicationCard({ application }: Props) {
  const [isLocked, setIsLocked] = useState(application.state === "locked");

  return (
    <div className="relative border border-secondary p-2 text-xs sm:p-6">
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Image
          alt=""
          className="mx-auto mt-3 h-24 min-w-24 rounded-full object-cover object-top sm:mt-0"
          height={100}
          src={application.applicant.imgUrl}
          width={100}
        />
        <div className="flex-grow">
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex-grow">
              <div className="mb-2 flex w-full flex-col justify-between sm:mb-0 sm:flex-row">
                <div className="flex gap-2 text-2xl font-semibold">
                  <div className="w-full text-center sm:w-auto">{application.applicant.name}</div>
                  {isLocked ? (
                    <BiLock className="absolute start-0 top-0 m-2 fill-red-600 sm:static" size={24} />
                  ) : (
                    <BiLockOpen className="absolute start-0 top-0 m-2 fill-primary sm:static" size={24} />
                  )}
                </div>
                <span className="absolute end-0 top-0 p-2 text-red-500 sm:static">
                  Applied {moment(application.appliedDate).fromNow()}
                </span>
              </div>
              <div className="mb-2 flex items-start">
                <div className="grid flex-grow grid-cols-2 items-start gap-1 text-strong-subtext sm:gap-2 lg:grid-cols-3">
                  <InfoItem
                    icon={<FaMapLocationDot className="fill-primary" size={20} />}
                    text={application.applicant.location}
                  />
                  <InfoItem
                    icon={<GiAges className="fill-primary" size={20} />}
                    text={`${application.applicant.age} years old`}
                  />
                  <InfoItem
                    icon={<FaSquarePersonConfined className="fill-primary" size={20} />}
                    text={`${application.applicant.experienceYears} years Experience`}
                  />
                  <InfoItem
                    icon={<GiGraduateCap className="fill-primary" size={20} />}
                    text={application.applicant.degree}
                  />
                  <InfoItem
                    icon={<BsPersonFill className="fill-primary" size={20} />}
                    text={application.applicant.careerLevel}
                  />
                  <InfoItem
                    icon={<PiHandbagFill className="fill-primary" size={20} />}
                    text={application.applicant.field}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center justify-center gap-2 sm:block sm:flex-row sm:justify-end">
              <div className="flex items-center gap-1 sm:mb-2 sm:gap-4">
                <Link
                  className="border border-secondary p-1.5"
                  href={`https://wa.me/${application.applicant.phone}`}
                  target="_blank"
                >
                  <FaWhatsappSquare className="fill-green-400" size={16} />
                </Link>
                <ActionButton icon={<BiMessageRounded className="fill-primary" size={16} />} />
                <ActionButton icon={<BsStarFill className="fill-primary" size={16} />} />
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
          <ExperienceItem
            country={exp.country}
            key={index}
            title={exp.title}
            yearFrom={exp.yearFrom}
            yearTo={exp.yearTo}
          />
        ))}
      </div>
    </div>
  );
}
