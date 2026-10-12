<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class TicketController extends Controller
{
    
public function index(Request $request): Response
{
    $query = $request->user()->tickets()->latest();

    if ($request->filled('search')) {
        $search = $request->input('search');

        $query->where('title', 'like', '%' . $search . '%');
    }

    if ($request->filled('status')) {
        $query->where('status', $request->input('status'));
    }

    if ($request->filled('priority')) {
        $query->where('priority', $request->input('priority'));
    }

    $tickets = $query->paginate(10)->withQueryString();

    return Inertia::render('Tickets/Index', [
        'tickets' => $tickets,
        'filters' => $request->only(['search', 'status', 'priority']),
    ]);
}


    public function create(): Response
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $request->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    public function update(
        UpdateTicketRequest $request,
        Ticket $ticket
    ): RedirectResponse {
        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket deleted.');
    }
}
