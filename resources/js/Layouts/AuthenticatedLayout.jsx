import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Menu from '@/Components/Menu';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
const user = usePage().props.auth.user;
const { notifications } = usePage().props;


return (
	<div className="min-h-screen bg-gray-100">
		<nav className="border-b border-gray-100 bg-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 justify-between">
					
					<Menu user={user} notifications={notifications}/>
					
				</div>
			</div>
		</nav>

		{header && (
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{header}
				</div>
			</header>
		)}

		<main>{children}</main>
	</div>
);
}
