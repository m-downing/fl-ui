import React, { useState } from 'react';
import Input from '@/app/components/design-system/Input';
import Select, { SelectOption } from '@/app/components/design-system/Select';

// Icons for Input elements
const DataCenterIcon = (
  <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const SearchIcon = (
  <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShowcaseGroup: React.FC<{ title: string; children: React.ReactNode; className?: string }> = 
  ({ title, children, className }) => (
  <div className={`mb-10 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm ${className || ''}`}>
    <h3 className="text-xl font-semibold text-neutral-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const FormField: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);


const sampleOptions: SelectOption[] = [
  { value: 'compute', label: 'Compute Racks' },
  { value: 'storage', label: 'Storage Racks' },
  { value: 'network', label: 'Network Infrastructure', disabled: true },
  { value: 'security', label: 'Security Appliances' },
  { value: 'power', label: 'Power Distribution' },
];

export function InputSelectShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [rackId, setRackId] = useState('NYC-COMP-A2145');
  const [equipmentType, setEquipmentType] = useState('compute');

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Data Center Equipment Management</h2>
        <div className="inline-flex items-center gap-0.5 text-xs border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-50 cursor-pointer bg-neutral-100 mr-4">
          <svg 
            className="w-4 h-4" 
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span className="font-semibold">README</span>
        </div>
      </div>
      <p className="text-sm text-neutral-600 mb-8">
        Form components used by supply chain operators to track, order, and manage server rack deployments 
        across the global financial institution&apos;s data center network.
      </p>

      <ShowcaseGroup title="Equipment Tracking & Identification">
        <FormField>
          <Input 
            label="Rack ID" 
            placeholder="Enter server rack ID" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helperText="Format: LOCATION-TYPE-ID (e.g., NYC-COMP-A1234)"
          />
        </FormField>
        <FormField>
          <Input 
            label="Data Center Location (Required)" 
            type="text" 
            placeholder="e.g., NYC-EAST-05"
            required
            leftElement={DataCenterIcon}
          />
        </FormField>
        <FormField>
          <Input 
            label="Power Capacity (Error State)" 
            type="text" 
            placeholder="Enter kW rating"
            error="Power capacity must be a number between 1-40 kW."
            defaultValue="50kW"
          />
        </FormField>
        <FormField>
          <Input 
            label="Rack Search"
            placeholder="Search by rack ID or location..."
            leftElement={SearchIcon}
            rightElement={<span className="text-xs text-neutral-400">Ctrl+K</span>}
          />
        </FormField>
        <FormField>
          <Input label="Rack Position" placeholder="Row-Rack (e.g., A-12)" size="sm" />
        </FormField>
        <FormField>
          <Input label="Installation Notes" placeholder="Special installation requirements" size="lg" />
        </FormField>
        <FormField>
          <Input label="Asset Tag (Legacy System)" placeholder="Enter asset tag" disabled value="ASSET-34928-FR" />
        </FormField>
        <FormField>
          <Input label="Deployment Comments" placeholder="Add notes for deployment team" fullWidth />
        </FormField>
      </ShowcaseGroup>

      <ShowcaseGroup title="Procurement & Capacity Planning">
        <FormField>
          <Select 
            label="Equipment Type"
            options={sampleOptions}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            helperText="Select the type of infrastructure equipment."
            placeholder="-- Select equipment type --"
          />
        </FormField>
        <FormField>
          <Select 
            label="Data Center Region (Required)"
            options={[{value: 'nam', label: 'North America'}, {value: 'emea', label: 'Europe/Middle East'}, {value: 'apac', label: 'Asia Pacific'}]}
            required
            defaultValue="emea"
          />
        </FormField>
        <FormField>
          <Select 
            label="Deployment Status (Error State)"
            options={[{value: 'ordered', label: 'Ordered'}, {value: 'in-transit', label: 'In Transit'}]}
            error="Please select a deployment status."
            value=""
            onChange={() => {}} // Dummy onchange for controlled component with error
          />
        </FormField>
        <FormField>
          <Select label="Rack Vendor" options={[
            {value: 'vendor1', label: 'Dell Technologies'}, 
            {value: 'vendor2', label: 'HPE'}, 
            {value: 'vendor3', label: 'Cisco Systems'}
          ]} size="sm" placeholder="Select vendor" />
        </FormField>
        <FormField>
          <Input label="Procurement Timeline" helperText="To show Select height alignment" />
          {/* Adding an input to compare vertical alignment of default select */}
        </FormField>
         <FormField>
          <Select label="Power Distribution Units" options={[
            {value: 'redundant', label: 'Redundant (A+B)'}, 
            {value: 'single', label: 'Single Feed'}, 
            {value: 'highdens', label: 'High Density'}
          ]} size="lg" placeholder="Select PDU configuration" />
        </FormField>
        <FormField>
          <Select label="Warranty Status" options={[
            {value: 'active', label: 'Active'}, 
            {value: 'expired', label: 'Expired'}, 
            {value: 'renewal', label: 'Pending Renewal'}
          ]} disabled value="active" />
        </FormField>
        <FormField>
          <Select label="Expected Deployment Date" options={[
            {value: 'q4-2023', label: 'Q4 2023'}, 
            {value: 'q1-2024', label: 'Q1 2024'}, 
            {value: 'q2-2024', label: 'Q2 2024'},
            {value: 'q3-2024', label: 'Q3 2024'}
          ]} fullWidth placeholder="Select deployment quarter" />
        </FormField>
      </ShowcaseGroup>

      <ShowcaseGroup title="Equipment Order Processing">
        <FormField>
          <Input 
            label="Rack ID"
            value={rackId}
            onChange={(e) => setRackId(e.target.value)}
            helperText="Currently updating order details below."
          />
        </FormField>
        <FormField>
          <Select
            label="Equipment Type"
            options={sampleOptions}
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            helperText="Update to see rack specifications change."
          />
        </FormField>
        <div className="md:col-span-2 p-4 bg-neutral-50 rounded">
          <p className="text-sm text-neutral-700">Current Order: <span className="font-semibold">{rackId || '(empty)'}</span></p>
          <p className="text-sm text-neutral-700">Equipment Type: <span className="font-semibold">{equipmentType || ' (none)'}</span></p>
          <p className="text-sm text-neutral-700 mt-2">
            <span className="font-semibold">Order Summary:</span> {equipmentType === 'compute' ? '42U Compute Rack with 2x PDUs, 40kW capacity' : 
              equipmentType === 'storage' ? '42U Storage Rack with SAN connectivity, 30kW capacity' : 
              equipmentType === 'power' ? 'Power Distribution Unit with redundant feeds' : 
              'Select equipment type for specifications'}
          </p>
        </div>
      </ShowcaseGroup>

    </div>
  );
} 