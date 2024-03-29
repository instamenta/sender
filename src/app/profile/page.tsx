'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaAddressCard } from 'react-icons/fa6';
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
import { useEdgeStore } from '@/lib/store/edgestore';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  updateBio,
  updateProfilePicture,
  updateProfilePublicInformation,
} from '@/lib/queries/user';
import { personal_data_schema } from '@/lib/validation/schemas';
import { toast } from 'react-toastify';
import TextArea from '@/components/functional/TextArea';
import { useUserContext } from '@/lib/context/UserContext';
import useUser from '@/lib/store';
import {
  useErrorNotification,
  useSuccessNotification,
  useWarnNotification,
} from '@/components/toast/CustomToasts';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar'; // TODO ADD EDIT PROFILE

type T_personalInfo = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
};

const Profile = () => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { user, setUser } = useUserContext();

  const [file, setFile] = React.useState<File>();
  const [toggleImagePicker, setToggleImagePicker] = useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [personalInfo, setPersonalInfo] = useState<T_personalInfo>({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
  });

  useEffect(() => {
    setPersonalInfo({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    });
    setDescription(user.bio);
  }, []);

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!file) {
      useWarnNotification('Image is required', { position: 'top-center' });
      return console.warn('Image is required');
    }
    const r = await edgestore.publicFiles.upload({ file });

    const response = await updateProfilePicture(r.url);
    if (!response) {
      useErrorNotification('Failed to update', {
        position: 'top-center',
      });
      return console.log('Empty response body');
    }

    useSuccessNotification('Successfully updated', {
      position: 'bottom-center',
    });

    useUser.getState().setUser(response.userData);
    setUser(response.userData);
    setToggleImagePicker(false);
    router.refresh();
  };

  const handlePersonalInfoFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    let data;
    try {
      data = personal_data_schema.parse({
        username: (form.querySelector('[name="username"]') as HTMLInputElement)
          ?.value,
        firstName: (
          form.querySelector('[name="first_name"]') as HTMLInputElement
        )?.value,
        lastName: (form.querySelector('[name="last_name"]') as HTMLInputElement)
          ?.value,
        email: (form.querySelector('[name="email"]') as HTMLInputElement)
          ?.value,
      });
    } catch (error) {
      return console.log('Invalid form:', form);
    }

    const request: {
      username?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
    } = {};
    if (data.username !== user!.username) request.username = data.username;
    if (data.firstName !== user!.first_name) request.firstName = data.firstName;
    if (data.lastName !== user!.last_name) request.lastName = data.lastName;
    if (data.email !== user!.email) request.email = data.email;

    const response = await updateProfilePublicInformation(request);
    if (!response) {
      toast(() => (
        <div className="bg-red-400 outline outline-2 outline-red-600">
          <p className="m-auto text-center font-bold">Failed to update info.</p>
        </div>
      ));
      return console.error('empty response');
    }

    toast(() => (
      <div className="outline outline-2 outline-green-600">
        <p className="m-auto text-center font-bold">
          Successfully updated info
        </p>
      </div>
    ));
    useUser.getState().setUser(response.userData);
    setUser(response.userData);
    setToggleEdit(false);
    router.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateBio = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const response = await updateBio(description);
    if (!response) {
      toast(() => (
        <div className="bg-red-400 outline outline-2 outline-red-600">
          <p className="m-auto text-center font-bold">Failed to update Bio.</p>
        </div>
      ));
      return console.error('empty response');
    }

    toast(() => (
      <div className="outline outline-2 outline-green-600">
        <p className="m-auto text-center font-bold">Successfully updated Bio</p>
      </div>
    ));

    useUser.getState().setUser(response.userData);
    setUser(response.userData);
    setDescription('');
    router.refresh();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pb-10 text-black md:mx-auto md:max-w-[640px] ">
        {/* NAVIGATION BAR */}
        <Sidebar />

        {/* TOP CONTAINER */}
        <section className="flex flex-col justify-center py-7 align-middle">
          <div className="relative flex w-full flex-row justify-center pb-8">
            {/* Profile Image AND\OR Image Uploader */}
            {toggleImagePicker ? (
              <div className="w-full">
                <SingleImageDropzone
                  width={50}
                  height={50}
                  value={file}
                  className="m-auto"
                  onChange={(file) => setFile(file)}
                />
              </div>
            ) : (
              <div className=" m-auto aspect-square w-24 overflow-hidden rounded-full outline outline-2 outline-gray-600">
                <img
                  className="h-full w-full"
                  src={user?.picture ?? ''}
                  alt="Prifle Image"
                />
              </div>
            )}

            {toggleImagePicker ? (
              <button
                className="absolute mr-44 h-10 w-10 rounded-full transition-all hover:bg-blue-200"
                onClick={handleImageUpload}
              >
                <IoCloudUploadOutline className="h-10 w-10 transition-all hover:scale-110" />
              </button>
            ) : (
              <></>
            )}
            <button
              className="absolute ml-44 h-10 w-10 rounded-full transition-all hover:bg-purple-200"
              onClick={(event) => {
                event.preventDefault();
                setToggleImagePicker((prev) => !prev);
              }}
            >
              <GoGear className="h-10 w-10 transition-all hover:scale-110" />
            </button>
          </div>

          {/* User Data Header */}
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

        {/* Bio*/}
        <div className="mx-10 pb-2 text-xl">Biography</div>
        <section className="mx-10 mb-6 rounded-xl border border-slate-400">
          <TextArea
            description={description}
            setDescription={setDescription}
            placeholder="Maybe something you relate to?"
            rows={4}
            small={true}
          />
          <div className="flex justify-center border-t border-t-slate-400">
            <button
              onClick={handleUpdateBio}
              className="border-x-2 border-y border-slate-400 bg-white px-4 py-1 font-semibold
           transition-all hover:scale-110 hover:border-blue-600 hover:text-blue-600"
            >
              Update
            </button>
          </div>
        </section>

        {/* USER DATA CONTAINER */}
        <form onSubmit={handlePersonalInfoFormSubmit} className="mx-10">
          {/* HEADER */}
          <div className="flex justify-between">
            <span className="select-none text-xl font-normal text-gray-700">
              Personal Information
            </span>
            {toggleEdit ? (
              <button
                type="submit"
                className="rounded-md px-2 font-semibold text-blue-600 outline outline-2 outline-blue-600
              transition-all hover:scale-110 hover:bg-slate-200
            "
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setToggleEdit(true);
                }}
                className="flex flex-row pr-2 font-bold text-blue-600 transition-all hover:scale-105 hover:underline"
              >
                <span className="pr-1">Edit</span>
                <CiEdit className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* DATA SECTION */}
          {/* Email Input */}
          <div className="my-1.5 flex justify-between rounded-t-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="flex flex-row pl-4 font-light">
              <CiMail className="h-6 w-6" />
              <label htmlFor="email" className="px-4 font-light text-slate-600">
                Email
              </label>
            </div>
            <input
              id="email"
              name="email"
              className="w-full pr-4 text-end"
              value={personalInfo.email}
              onChange={handleInputChange}
            />
          </div>

          {/* First Name Input */}
          <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="flex flex-row pl-4 font-light">
              <FaAddressCard className="h-6 w-6" />
              <label
                htmlFor="first_name"
                className="px-4 font-light text-slate-600"
              >
                First name
              </label>
            </div>
            <input
              id="first_name"
              name="first_name"
              className="w-full pr-4 text-end"
              value={personalInfo.first_name}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name Input */}
          <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="flex flex-row pl-4 font-light">
              <FaRegAddressCard className="h-6 w-6" />
              <label
                htmlFor="last_name"
                className="px-4 font-light text-slate-600"
              >
                Last name
              </label>
            </div>
            <input
              id="last_name"
              name="last_name"
              className="w-full pr-4 text-end"
              value={personalInfo.last_name}
              onChange={handleInputChange}
            />
          </div>

          {/* Username Input */}
          <div className="my-1.5 flex justify-between border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="flex flex-row pl-4 font-light">
              <MdOutlineAlternateEmail className="h-6 w-6" />
              <label
                htmlFor="username"
                className="px-4 font-light text-slate-600"
              >
                Username
              </label>
            </div>
            <input
              id="username"
              name="username"
              className="w-full pr-4 text-end"
              value={personalInfo.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-1.5 flex justify-between rounded-b-xl border-none py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="flex flex-row pl-4 font-light">
              <CiLocationOn className="h-6 w-6" />
              <label className="px-4 font-light text-slate-600">Location</label>
            </div>
            <span className="pr-4">{'Sofia/Bulgaria'}</span>
          </div>
        </form>

        <section className="mx-10">
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
    </>
  );
};

export default Profile;
