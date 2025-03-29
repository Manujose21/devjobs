import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { useState } from 'react';
import  ResponsiveNavLink  from '@/Components/ResponsiveNavLink';

export default function Menu({ user, notifications }) {

    const { rol, name } = user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <div className="flex">
                <div className="flex shrink-0 items-center">
                    <Link href="/dashboard">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                </div>
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    {
                        rol === 2 ? 
                        (
                            <>
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard - Mis vacantes
                                </NavLink>

                                <NavLink
                                    href={route('vacants.create')}
                                    active={route().current('vacants.create')}
                                >
                                    Crear vacantes			
                                </NavLink>

                                <NavLink
                                    href={route('vacants.postulates')}
                                    active={route().current('vacants.postulates')}
                                >
                                    Postulados
                                </NavLink>
                            </>
                        ) 
                        : (
                            <>
                                <NavLink
                                   href={route('dashboard')}
                                   active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                   href={route('vacants.search')}
                                   active={route().current('vacants.search')}
                                >
                                    Ver vacantes
                                </NavLink>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                <div className="relative ms-3">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md ">
                                <Link href={route('notifications')}>
                                    <button className='relative flex gap-1 items-center rounded-[999px] border bg-indigo-600 text-white px-4 py-2'>
                                        { notifications.length }
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                        </svg>

                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    { name }

                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route('profile.edit')}
                            >
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState,
                        )
                    }
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={
                                !showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={
                                showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

                  
        </>
    )
}