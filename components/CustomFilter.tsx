"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();
  // disini options[0] karena pada awal options itu berada pada array ke 0 yaitu fuels atau yearproduction
  const [selected, setselected] = useState(options[0]);

  // ditambahkan const ini untuk menambahkan filter pada params/url yang ada
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathname = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathname, { scroll: false });
  };

  return (
    <div className="w-fit ">
      <Listbox
        value={selected}
        onChange={(e) => {
          setselected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="w-fit z-10 relative font-semibold">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate"> {selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              alt=""
              className="object-contain ml-4"
              width={20}
              height={20}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  value={option}
                  key={option.title}
                  className={({ active }) =>
                    `hover:bg-primary-blue hover:duration-200 cursor-default relative py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {(selected) => (
                    <span className="block truncate">{option.title}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
