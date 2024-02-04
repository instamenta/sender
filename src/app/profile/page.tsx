'use client';

import React, { useEffect, useState } from 'react';
import { I_UserSchema } from '@/lib/types';
import useUser from '@/lib/store';
import { FaAddressCard, FaChevronLeft } from 'react-icons/fa6';
import {
  CiEdit,
  CiGlobe,
  CiLocationOn,
  CiLock,
  CiMail,
  CiPhone,
} from 'react-icons/ci';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { useRouter } from 'next/navigation';

// TODO ADD EDIT PROFILE
// TODO IMPLEMENT CHANGE PASSWORD

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState<I_UserSchema | null>(null);
  useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((d) => {
        setUser(d);
        console.log(d);
      });
  }, []);

  return (
    <div className="h-screen bg-white text-black">
      {/* NAVIGATION BAR */}
      <nav className="flex justify-between px-3 pt-3">
        <button
          className="flex justify-center align-middle"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>

        <div className="m-auto w-full text-center">
          <h1 className="select-none pb-5 text-xl font-medium">Edit Profile</h1>
        </div>
        <button className="flex justify-center align-middle">
          <GoGear className="h-7 w-7" />
        </button>
      </nav>

      {/* TOP CONTAINER */}
      <section className="flex flex-col justify-center py-7 align-middle">
        <div className="w-full pb-8">
          <div className=" m-auto aspect-square w-24 overflow-hidden rounded-full outline outline-2 outline-gray-600">
            <img
              className="h-full w-full"
              src={user?.picture ?? ''}
              alt="Prifle Image"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center align-middle">
          <h2 className="m-auto text-2xl font-medium">
            {(user?.first_name ?? '') + ' ' + (user?.last_name ?? '')}
          </h2>
          <span className="text-md m-auto font-light text-gray-600">
            Created on:{' '}
            <label className="text-gray-500">
              {user?.created_at
                ? new Date(user?.created_at).toLocaleDateString()
                : ''}
            </label>
          </span>
        </div>
      </section>

      {/* USER DATA CONTAINER */}
      <section className="mx-14">
        {/* HEADER */}
        <div className="flex justify-between">
          <span className="select-none text-xl font-normal text-gray-700">
            Personal Information
          </span>
          <button className="flex flex-row pr-2 font-bold text-blue-600 transition-all hover:scale-105 hover:underline">
            <span className="pr-1">Edit</span>
            <CiEdit className="h-6 w-6" />
          </button>
        </div>

        {/* DATA SECTION */}
        <div className="my-1.5 flex justify-between rounded-t-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <CiMail className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Email</label>
          </div>
          <span className="pr-4">{user?.email ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <FaAddressCard className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">First name</label>
          </div>
          <span className="pr-4">{user?.first_name ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <FaRegAddressCard className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Last name</label>
          </div>
          <span className="pr-4">{user?.last_name ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <MdOutlineAlternateEmail className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Username</label>
          </div>
          <span className="pr-4">{user?.username ?? ''}</span>
        </div>
        <div className="my-1.5 flex justify-between rounded-b-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <CiLocationOn className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Location</label>
          </div>
          <span className="pr-4">{'Sofia/Bulgaria'}</span>
        </div>
      </section>

      <section className="mx-14">
        {/* HEADER */}
        <div className="flex justify-between pt-4">
          <span className="select-none text-xl font-normal text-gray-600">
            Private Information
          </span>
          <button className="flex flex-row pr-2 font-bold text-blue-600 transition-all hover:scale-105 hover:underline">
            <span className="pr-1">Edit</span>
            <CiEdit className="h-6 w-6" />
          </button>
        </div>
        {/* DATA FIELDS */}
        <div className="my-1.5 flex justify-between rounded-t-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <CiPhone className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Phone</label>
          </div>
          <span className="pr-4">{'+389 89 797 6630'}</span>
        </div>
        <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <CiLock className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Password</label>
          </div>
          <span className="pr-4">*******</span>
        </div>
        <div className="my-1.5 flex justify-between rounded-b-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
          <div className="flex flex-row pl-4 font-light">
            <CiGlobe className="h-6 w-6" />
            <label className="px-4 font-light text-slate-600">Language</label>
          </div>
          <span className="pr-4">{'English'}</span>
        </div>
      </section>

      {/* Action Buttons Container */}
      <section className="mx-14 pt-5">
        <button
          type="submit"
          className="w-full rounded-2xl py-2 text-blue-600 outline outline-blue-600
            transition-all hover:bg-blue-600 hover:font-bold hover:text-white"
        >
          Sign out
        </button>

        <button
          type="submit"
          className="mt-5 w-full rounded-2xl py-2 text-red-600  outline outline-red-600
            transition-all hover:border-red-600 hover:bg-red-600 hover:font-bold hover:text-white"
        >
          Disable Profile
        </button>
      </section>
    </div>
  );
};

export default Profile;

// const asd = {
//   created_at: '2024-02-03T11:21:28.148Z',
//   email: 'user_2@gmail.com',
//   first_name: 'Biligual',
//   id: '0785af03-59e5-4b9c-a22d-eb194595f055',
//   last_active_at: '2024-02-03T19:43:26.002Z',
//   last_name: 'Malinug',
//   password: '$2b$10$OPBh1im3G0VpbVEDTOxGPOt5pr1mF3VGnVl1C7LIgphU9JHgJnA9a',
//   picture:
//     'https://openseauserdata.com/files/3d825b936774e0ae3c8247613c91d436.png',
//   updated_at: '2024-02-03T11:21:28.148Z',
//   username: 'user_2',
// };