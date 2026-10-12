
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Ticket = {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    category: string;
};

type Props = {
    ticket: Ticket;
};

export default function Edit({ ticket }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/tickets/${ticket.id}`);
    }

    return (
        <>
            <Head title="Edit Ticket" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-2xl rounded bg-white p-6 shadow">
                    <h1 className="mb-6 text-3xl font-bold">
                        Edit Ticket #{ticket.id}
                    </h1>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-1 block font-medium">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded border p-2"
                                required
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded border p-2"
                                rows={5}
                                required
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Priority
                            </label>

                            <select
                                value={data.priority}
                                onChange={(e) =>
                                    setData('priority', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>

                            {errors.priority && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.priority}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Category
                            </label>

                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                                <option value="Account">Account</option>
                                <option value="Other">Other</option>
                            </select>

                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>

                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save Changes'}
                            </button>

                            <Link
                                href={`/tickets/${ticket.id}`}
                                className="rounded border px-5 py-2"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
