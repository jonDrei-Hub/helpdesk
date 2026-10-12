import { Head, Link } from '@inertiajs/react';

type Ticket = {
    id: number;
    title: string;
    priority: string;
    status: string;
    category: string;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    tickets: {
        data: Ticket[];
        links: PaginationLink[];
    };
    filters?: {
        priority?: string;
        status?: string;
    };
    flash?: {
        success?: string;
    };
};

export default function Index({ tickets, filters, flash }: Props) {
    return (
        <>
            <Head title="My Tickets" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold">
                            My HelpDesk Tickets
                        </h1>

                        <Link
                            href="/tickets/create"
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Create Ticket
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-100 p-3 text-green-800">
                            {flash.success}
                        </div>
                    )}

                    <form
                        action="/tickets"
                        method="get"
                        className="mb-6 flex flex-wrap gap-3 rounded bg-white p-4 shadow"
                    >
                        <select
                            name="priority"
                            defaultValue={filters?.priority ?? ''}
                            className="rounded border p-2"
                        >
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>

                        <select
                            name="status"
                            defaultValue={filters?.status ?? ''}
                            className="rounded border p-2"
                        >
                            <option value="">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>

                        <button
                            type="submit"
                            className="rounded bg-gray-800 px-4 py-2 text-white"
                        >
                            Filter
                        </button>

                        <Link
                            href="/tickets"
                            className="rounded border px-4 py-2"
                        >
                            Clear
                        </Link>
                    </form>

                    <div className="overflow-x-auto rounded bg-white shadow">
                        <table className="w-full text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Priority</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tickets.data.length > 0 ? (
                                    tickets.data.map((ticket) => (
                                        <tr
                                            key={ticket.id}
                                            className="border-t"
                                        >
                                            <td className="p-3">
                                                {ticket.title}
                                            </td>
                                            <td className="p-3">
                                                {ticket.category}
                                            </td>
                                            <td className="p-3">
                                                {ticket.priority}
                                            </td>
                                            <td className="p-3">
                                                {ticket.status}
                                            </td>
                                            <td className="flex flex-wrap gap-3 p-3">
                                                <Link
                                                    href={`/tickets/${ticket.id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    href={`/tickets/${ticket.id}/edit`}
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-6 text-center text-gray-500"
                                        >
                                            No tickets found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {tickets.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? '/tickets'}
                                preserveScroll
                                className={`rounded border px-3 py-2 ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white'
                                } ${
                                    !link.url
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}