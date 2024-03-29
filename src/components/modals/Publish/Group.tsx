'use client';

import React, { useEffect, useState } from 'react';
import TextArea from '@/components/functional/TextArea';
import { useEdgeStore } from '@/lib/store/edgestore';
import {
  FileState,
  MultiImageDropzone,
} from '@/components/edgestore/MultiImageDropzone';
import { MdGroups2 } from 'react-icons/md';
import { I_Group } from '@/lib/types';
import { useUserContext } from '@/lib/context/UserContext';
import { createGroupPublication, listGroupsByUser } from '@/lib/queries/group';
import { useRouter } from 'next/navigation';
import { useErrorNotification, useSuccessNotification } from '@/components/toast/CustomToasts';

const PublishGroupPublicationModal = () => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [description, setDescription] = useState<string>('');
  const [groups, setGroups] = useState<I_Group[]>([]);
  const [picked, setPicked] = useState<I_Group | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    listGroupsByUser(user.id).then((d) => {
      setGroups(d);
      if (d.length) setPicked(d[0]);
    });
  }, [user]);

  const handleGroupClick = (group: I_Group) => {
    setPicked(group);
    setToggle((prev) => !prev);
  };

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!picked) return console.error('No group picked');

    const imageUrls: string[] = [];

    await Promise.all(
      fileStates.map(async (addedFileState) => {
        try {
          const res = await edgestore.publicFiles.upload({
            // @ts-ignore
            file: addedFileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(addedFileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(addedFileState.key, 'COMPLETE');
              }
            },
            options: undefined,
          });
          imageUrls.push(res.url);
        } catch (error) {
          console.error(error);
          useErrorNotification('Internal Error');
          updateFileProgress(addedFileState.key, 'ERROR');
        }
      }),
    );

    const response = await createGroupPublication(description, imageUrls, picked.id);
    if (!response) {
      useErrorNotification('Failed to create post', {position: 'top-center'});
      return console.error('Failed to create post');
    }

    useSuccessNotification('Successfully created group publication', {position: 'bottom-center'});
    router.push(`/group/${response.id}`);
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center">
        <MdGroups2 className="mx-auto size-28 fill-green-600" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Publish to Group
        </h2>
      </div>

      <div className="relative w-full px-4 py-2 pb-6">
        <div
          className="rounded-xl py-2 outline outline-1 outline-slate-500"
          onClick={() => setToggle((prev) => !prev)}
        >
          <div className="">
            {picked ? (
              <div className="flex flex-nowrap gap-2 px-4">
                <div>
                  <img src={picked.image_url} className="size-6" alt="pic" />
                </div>
                <span className="my-auto text-sm font-semibold">
                  {picked.name}
                </span>
              </div>
            ) : (
              <span className="px-4">No groups</span>
            )}
          </div>
          {toggle && (
            <div className="absolute left-0 mt-3 w-full px-4">
              <ul className=" divide-y divide-gray-400 rounded-md border bg-white shadow-md">
                {groups.map((group, index) => (
                  <li
                    key={index}
                    className={`flex flex-nowrap gap-2 px-4 py-2 hover:bg-blue-50 ${
                      group.id === picked?.id ? 'bg-slate-200' : ''
                    }`}
                    onClick={() => handleGroupClick(group)}
                  >
                    <div>
                      <img src={group.image_url} className="size-6" alt="pic" />
                    </div>
                    <span className="my-auto text-sm font-semibold">
                      {group.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="px-4">
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
          <TextArea
            small={true}
            description={description}
            setDescription={setDescription}
            placeholder='Description'
          />
        </div>
      </div>
      <div className="px-4">
        <MultiImageDropzone
          className="bg-slate-200"
          value={fileStates}
          dropzoneOptions={{
            maxFiles: 9,
          }}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
          }}
        />
      </div>

      <section className="flex w-full justify-center px-10 pb-4 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full rounded-md bg-green-600 py-1 text-lg font-semibold text-white outline outline-2 outline-green-600
        transition-all hover:bg-white hover:text-green-600"
        >
          Upload
        </button>
      </section>
    </>
  );
};

export default PublishGroupPublicationModal;
