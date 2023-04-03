import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  // rectangle-group
  RectangleGroupIcon,
  PencilIcon,
  ArchiveBoxIcon,
  UserCircleIcon,
  ClockIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

import IconSakura from "./Icons/sakura";

const nav = [
  { name: "Stories", href: "/stories", icon: PencilIcon },
  { name: "Timeline", href: "/timeline", icon: ClockIcon },
  // { name: "Archives", href: "/archives", icon: ArchiveBoxIcon },
  // { name: "Statistics", href: "/statistics", icon: ChartBarSquareIcon },
];

export default () => (
  <Fragment>
    <Popover className="sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 bg-white/95 supports-backdrop-blur:bg-white/60 ">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start md:w-0 md:flex-1">
            <Link href="/" className="inline-flex items-center">
              <span className="sr-only">Workflow</span>
              <IconSakura className="w-8 h-8 text-indigo-600 sm:w-10 sm:h-10 logo-rotate" />
              <span className="text-xl ml-2 font-medium">Qhan W</span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {nav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium inline-flex items-center text-gray-500 hover:text-gray-900"
              >
                <item.icon
                  className="flex-shrink-0 h-4 w-4 text-indigo-600 mr-3"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </Popover.Group>
          {/* <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </a>
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a>
            </div> */}
        </div>
      </div>

      <Popover.Panel
        focus
        className="absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <Link href="/">
                <IconSakura className="w-8 h-8 text-indigo-600 logo-rotate" />
              </Link>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {nav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
    <div className="header-line-shadow" />
  </Fragment>
);
