import React from 'react';

const VoiceMessage = () => {
  return (
    <div className="mt-6 flex items-start gap-2.5">
      <img
        className="h-8 w-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-e-xl rounded-es-xl border-gray-200 bg-white p-4 pb-2 shadow-xl">
        <div className=" flex items-center space-x-2 rtl:space-x-reverse">
          <button
            className="inline-flex items-center self-center rounded-lg bg-gray-100 p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-50"
            type="button"
          >
            <svg
              className="h-4 w-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 12 16"
            >
              <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
            </svg>
          </button>
          <svg
            aria-hidden="true"
            className="w-[145px] md:h-[40px] md:w-[185px]"
            viewBox="0 0 185 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="17" width="3" height="6" rx="1.5" fill="#6B7280" />
            <rect x="7" y="15.5" width="3" height="9" rx="1.5" fill="#6B7280" />
            <rect
              x="21"
              y="6.5"
              width="3"
              height="27"
              rx="1.5"
              fill="#6B7280"
            />
            <rect
              x="14"
              y="6.5"
              width="3"
              height="27"
              rx="1.5"
              fill="#6B7280"
            />
            <rect x="28" y="3" width="3" height="34" rx="1.5" fill="#6B7280" />
            <rect x="35" y="3" width="3" height="34" rx="1.5" fill="#6B7280" />
            <rect
              x="42"
              y="5.5"
              width="3"
              height="29"
              rx="1.5"
              fill="#6B7280"
            />
            <rect x="49" y="10" width="3" height="20" rx="1.5" fill="#6B7280" />
            <rect
              x="56"
              y="13.5"
              width="3"
              height="13"
              rx="1.5"
              fill="#6B7280"
            />
            <rect x="63" y="16" width="3" height="8" rx="1.5" fill="#6B7280" />
            <rect
              x="70"
              y="12.5"
              width="3"
              height="15"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="77" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
            <rect x="84" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
            <rect
              x="91"
              y="0.5"
              width="3"
              height="39"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect
              x="98"
              y="0.5"
              width="3"
              height="39"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="105" y="2" width="3" height="36" rx="1.5" fill="#E5E7EB" />
            <rect
              x="112"
              y="6.5"
              width="3"
              height="27"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="119" y="9" width="3" height="22" rx="1.5" fill="#E5E7EB" />
            <rect
              x="126"
              y="11.5"
              width="3"
              height="17"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="133" y="2" width="3" height="36" rx="1.5" fill="#E5E7EB" />
            <rect x="140" y="2" width="3" height="36" rx="1.5" fill="#E5E7EB" />
            <rect x="147" y="7" width="3" height="26" rx="1.5" fill="#E5E7EB" />
            <rect x="154" y="9" width="3" height="22" rx="1.5" fill="#E5E7EB" />
            <rect x="161" y="9" width="3" height="22" rx="1.5" fill="#E5E7EB" />
            <rect
              x="168"
              y="13.5"
              width="3"
              height="13"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="175" y="16" width="3" height="8" rx="1.5" fill="#E5E7EB" />
            <rect
              x="182"
              y="17.5"
              width="3"
              height="5"
              rx="1.5"
              fill="#E5E7EB"
            />
            <rect x="66" y="16" width="8" height="8" rx="4" fill="#1C64F2" />
          </svg>
          <span className="inline-flex items-center self-center p-2 text-sm font-medium text-gray-900">
            3:42
          </span>
        </div>
        <span className="text-sm font-normal text-gray-500">Delivered</span>
      </div>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex flex-shrink-0 items-center self-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
        type="button"
      >
        <svg
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id="dropdownDots"
        className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow"
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Reply
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Forward
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Copy
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Report
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceMessage;
