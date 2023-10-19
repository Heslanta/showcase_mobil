"use client";
import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { CarDetails, CustomButton } from ".";
import { calculateCarRent } from "@/utils";
import { fuels } from "@/constants";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive, fuel_type } = car;

  // car rent disini guna untuk mendapatkan harga rent dari citymgp dan tahun
  const carRent = calculateCarRent(city_mpg, year);

  // disini isopen false karena kalau true modal akan langsung pop up
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group cursor-pointer">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-semibold">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/hero.png"
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray-500">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steer wheel"
              width={20}
              height={20}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" alt="steer wheel" width={20} height={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" alt="steer wheel" width={20} height={20} />
            <p className="text-[14px]">
              {fuel_type === "gas" ? "Gas" : "Electric"}
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white texxt-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        IsOpen={IsOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
