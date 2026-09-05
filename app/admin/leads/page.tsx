'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Download,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Loader2,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';

export default function LeadsInboxPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status });
        }
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'City', 'Service', 'Source Page', 'Status', 'Message'];
    const rows = leads.map((l) => [
      l.id,
      `"${new Date(l.created_at || Date.now()).toLocaleDateString()}"`,
      `"${(l.name || `${l.first_name || ''} ${l.last_name || ''}`).replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.source_page || '').replace(/"/g, '""')}"`,
      `"${(l.status || 'New').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Arvian_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const name = (l.name || `${l.first_name || ''} ${l.last_name || ''}`).toLowerCase();
    const email = (l.email || '').toLowerCase();
    const phone = (l.phone || '').toLowerCase();
    const service = (l.service || '').toLowerCase();
    const query = search.toLowerCase();

    const matchesSearch = name.includes(query) || email.includes(query) || phone.includes(query) || service.includes(query);
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Customer Inquiries & Leads Inbox
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time contact submissions, consultation requests, and modal popup leads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={exportToCSV}
            disabled={leads.length === 0}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white font-semibold text-gray-700"
          >
            <option value="All">All Statuses ({leads.length})</option>
            <option value="New">New ({leads.filter((l) => l.status === 'New').length})</option>
            <option value="Contacted">Contacted ({leads.filter((l) => l.status === 'Contacted').length})</option>
            <option value="In Progress">In Progress ({leads.filter((l) => l.status === 'In Progress').length})</option>
            <option value="Converted">Converted ({leads.filter((l) => l.status === 'Converted').length})</option>
            <option value="Closed">Closed ({leads.filter((l) => l.status === 'Closed').length})</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          No leads found matching your criteria.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact Details</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => {
                  const leadName = lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || 'Anonymous';
                  const dateStr = lead.created_at
                    ? new Date(lead.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Recent';

                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        <div>{leadName}</div>
                        {lead.city && (
                          <div className="text-[10px] text-gray-400 flex items-center gap-1 font-normal">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{lead.city}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${lead.phone}`}
                          className="font-medium text-gray-800 hover:text-red-600 block"
                        >
                          {lead.phone}
                        </a>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-[11px] text-gray-400 hover:text-gray-600 block"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-700">
                        {lead.service || 'General Consultation'}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">
                          {lead.source_page || 'Website'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                            lead.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : lead.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Lead Details
              </span>
              <h2 className="text-lg font-black text-gray-900 mt-1">
                {selectedLead.name || `${selectedLead.first_name || ''} ${selectedLead.last_name || ''}`}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                <a href={`tel:${selectedLead.phone}`} className="font-bold text-gray-800 hover:text-red-600">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                <a href={`mailto:${selectedLead.email}`} className="font-bold text-gray-800 hover:text-red-600">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">City</p>
                <p className="font-bold text-gray-800">{selectedLead.city || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Service</p>
                <p className="font-bold text-gray-800">{selectedLead.service || 'General'}</p>
              </div>
            </div>

            {selectedLead.message && (
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Customer Message</p>
                <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Status:</span>
                <select
                  value={selectedLead.status || 'New'}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
