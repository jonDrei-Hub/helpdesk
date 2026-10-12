
import { Head, Link, router } from '@inertiajs/react';

type Ticket = {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    category: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    ticket: Ticket;
    flash?: {
        success?: string;
    };
};

export default function Show({ ticket, flash }: Props) {
    function deleteTicket() {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            router.delete(`/tickets/${ticket.id}`);
        }
    }

    return (
        <>
            <Head title={`Ticket #${ticket.id}`} />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-3xl font-bold">
                            Ticket #{ticket.id}
                        </h1>

                        <Link
                            href="/tickets"
                            className="rounded border px-4 py-2"
                        >
                            Back to Tickets
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-100 p-3 text-green-800">
                            {flash.success}
                        </div>
                    )}

                    <h2 className="mb-4 text-2xl font-semibold">
                        {ticket.title}
                    </h2>

                    <div className="mb-6 space-y-4">
                        <div>
                            <p className="font-semibold">Description</p>
                            <p className="whitespace-pre-wrap text-gray-700">
                                {ticket.description}
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">Category</p>
                            <p>{ticket.category}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Priority</p>
                            <p>{ticket.priority}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Status</p>
                            <p>{ticket.status}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Created At</p>
                            <p>{ticket.created_at}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Last Updated</p>
                            <p>{ticket.updated_at}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 border-t pt-5">
                        <Link
                            href={`/tickets/${ticket.id}/edit`}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Edit Ticket
                        </Link>

                        <button
                            type="button"
                            onClick={deleteTicket}
                            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            Delete Ticket
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
