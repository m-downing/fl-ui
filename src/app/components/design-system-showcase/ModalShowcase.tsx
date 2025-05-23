import React, { useState } from 'react';
import Modal from '@/app/components/design-system/Modal';
import Button from '@/app/components/design-system/Button';
import Input from '@/app/components/design-system/Input';

const ShowcaseSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = 
  ({ title, children, className }) => (
  <div className={`mb-8 p-4 border border-neutral-200 rounded-lg bg-white shadow-sm ${className || ''}`}>
    <h3 className="text-lg font-medium text-neutral-700 mb-3">{title}</h3>
    <div className="flex flex-wrap items-center gap-3">
      {children}
    </div>
  </div>
);

export function ModalShowcase() {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showNoOverlayCloseModal, setShowNoOverlayCloseModal] = useState(false);
  const [showCenteredModal, setShowCenteredModal] = useState(false);
  const [showIssueTrackerModal, setShowIssueTrackerModal] = useState(false);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Rack Management Interfaces</h2>
        <div className="inline-flex items-center gap-0.5 text-xs border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-50 cursor-pointer bg-neutral-100 mr-4">
          <svg 
            className="w-3.5 h-3.5" 
            fill="currentColor" 
            viewBox="0 0 330 330" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" />
            <path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" />
          </svg>
          <span className="font-semibold">README</span>
        </div>
      </div>
      <p className="text-sm text-neutral-600 mb-6">
        Interactive components used by supply chain managers to process data center infrastructure requests, 
        approve equipment orders, and manage server rack deployment workflows.
      </p>

      <ShowcaseSection title="Infrastructure Management Actions">
        <Button onClick={() => setShowBasicModal(true)}>View Rack Details</Button>
        <Button onClick={() => setShowFormModal(true)}>Business Use Case</Button>
        <Button onClick={() => setShowIssueTrackerModal(true)}>Issue Tracker</Button>
        <Button onClick={() => setShowNoOverlayCloseModal(true)}>Critical Alert</Button>
        <Button onClick={() => setShowCenteredModal(true)}>Deployment Confirmation</Button>
      </ShowcaseSection>

      {/* Basic Modal */}
      <Modal
        isOpen={showBasicModal}
        onClose={() => setShowBasicModal(false)}
        title="Server Rack Details"
        description="View specifications and deployment status."
      >
        <p className="text-neutral-700">
          <strong>Rack ID:</strong> FR-COMP-A7493<br />
          <strong>Type:</strong> Compute<br />
          <strong>Location:</strong> Frankfurt Data Center<br />
          <strong>Status:</strong> Deployed<br />
          <strong>Capacity:</strong> 12kW<br />
          <strong>Maintenance Schedule:</strong> Quarterly
        </p>
      </Modal>

      {/* Modal with Form Content */}
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title="Business Use Case Submission"
        size="xl"
        footer={
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-neutral-500">
              Case ID: <span className="font-mono">BUC-2023-0472</span> • Created: <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowFormModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => { alert("Business case submitted for review"); setShowFormModal(false); }}>Submit for Approval</Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Submitted By" placeholder="Enter your employee ID" required />
          <Input label="Department" type="text" placeholder="e.g., Trading Systems, Corporate Finance" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Project ID" type="text" placeholder="e.g., PROJ-2023-0451" required />
            <Input label="Cost Center" type="text" placeholder="e.g., CC-TECH-NA-450" required />
          </div>
          <Input label="Project Title" type="text" placeholder="Brief descriptive title of the infrastructure need" required />
          <div className="border border-neutral-200 rounded-md p-4 space-y-4 bg-neutral-50">
            <h4 className="font-medium text-neutral-800">Business Requirements</h4>
            <Input 
              label="Business Need" 
              type="text" 
              className="min-h-[80px]"
              placeholder="Describe the business need this infrastructure will address"
              required 
            />
            <Input 
              label="Technical Requirements" 
              type="text"
              className="min-h-[80px]"
              placeholder="Specific technical requirements (compute, storage, network, etc.)"
              required 
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expected Workload" type="text" placeholder="e.g., Trading Analytics, Risk Modeling" />
              <Input label="Expected Growth (6-12 mo)" type="text" placeholder="e.g., 30% YoY increase" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Estimated IOPS" type="text" placeholder="e.g., 50,000 IOPS" />
              <Input label="Estimated Network Bandwidth" type="text" placeholder="e.g., 10 Gbps" />
            </div>
          </div>
          <div className="border border-neutral-200 rounded-md p-4 space-y-4 bg-neutral-50">
            <h4 className="font-medium text-neutral-800">Budget & ROI</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Estimated Total Cost" type="text" placeholder="e.g., $1.2M" required />
              <Input label="Funding Source" type="text" placeholder="e.g., IT Capital Budget 2023" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expected ROI (months)" type="number" placeholder="e.g., 18" />
              <Input label="Cost Saving Projections" type="text" placeholder="e.g., $250K annually" />
            </div>
          </div>
          <div className="border border-neutral-200 rounded-md p-4 space-y-4 bg-neutral-50">
            <h4 className="font-medium text-neutral-800">Timeline & Location</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Target Go-Live Date" type="date" required />
              <Input label="Request Priority" type="text" placeholder="Critical, High, Medium, Low" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Primary Data Center" type="text" placeholder="e.g., NYC-East-07, London-West-02" required />
              <Input label="Disaster Recovery Site" type="text" placeholder="e.g., DAL-West-01, Frankfurt-North-03" />
            </div>
          </div>
          <div className="border border-neutral-200 rounded-md p-4 space-y-4 bg-neutral-50">
            <h4 className="font-medium text-neutral-800">Compliance & Security</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Compliance Requirements" 
                type="text" 
                placeholder="e.g., PCI DSS, SOX, GDPR, HIPAA"
              />
              <Input 
                label="Security Classification" 
                type="text" 
                placeholder="e.g., Restricted, Confidential, Public"
                required
              />
            </div>
            <Input 
              label="Regulatory Considerations" 
              type="text" 
              placeholder="Describe any specific regulatory requirements that impact infrastructure design"
              className="min-h-[60px]"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-4">
            All business use cases require review by the Technology Governance Committee and approval by the Data Center Operations team. 
            Cases with estimated costs exceeding $500,000 require executive board approval.
            Infrastructure requests with regulatory or compliance implications will undergo additional security and risk assessment.
          </p>
        </div>
      </Modal>

      {/* Issue Tracker Modal with Chat History */}
      <Modal
        isOpen={showIssueTrackerModal}
        onClose={() => setShowIssueTrackerModal(false)}
        title="SCT-001: Power capacity threshold exceeded"
        size="lg"
        footer={
          <div className="flex justify-end items-center w-full">
            <Button variant="secondary" onClick={() => setShowIssueTrackerModal(false)}>Close Issue Tracker</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Collapsible Contact Information Section */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <div 
              className="bg-neutral-50 p-3 flex justify-between items-center cursor-pointer"
              onClick={() => {
                const contactsEl = document.getElementById('contacts-section');
                if (contactsEl) {
                  contactsEl.classList.toggle('hidden');
                }
              }}
            >
              <h4 className="text-sm font-medium text-neutral-700">Key Contacts (2)</h4>
              <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div id="contacts-section" className="p-3 border-t border-neutral-200 hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-2 rounded border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Alice Wonderland</p>
                      <p className="text-xs text-neutral-500">DC Operations Lead</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="text-primary-600 hover:text-primary-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Bob The Builder</p>
                      <p className="text-xs text-neutral-500">Power Systems SME</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="text-primary-600 hover:text-primary-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Issue Details */}
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-neutral-500">Location</p>
                <p className="text-sm font-medium">NYC-EAST-12</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Reported</p>
                <p className="text-sm font-medium">2023-10-30 09:15:22</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Status</p>
                <p className="text-sm font-medium text-red-600">CRITICAL</p>
              </div>
            </div>
          </div>
          
          {/* Chat History */}
          <div className="border border-neutral-200 rounded-lg">
            <div className="p-3 bg-neutral-50 border-b border-neutral-200">
              <h4 className="text-sm font-medium text-neutral-700">Resolution Log</h4>
            </div>
            <div 
              className="p-3 max-h-60 overflow-y-auto" 
              style={{ 
                minHeight: "240px", 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onScroll={(e) => e.currentTarget.classList.add('chat-scroll')}
            >
              <style jsx>{`
                .chat-scroll::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* Message 1 */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-700">AW</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium text-neutral-700">Alice Wonderland</p>
                      <p className="text-xs text-neutral-500">09:18:33</p>
                    </div>
                    <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                      <p className="text-sm">Initial assessment: UPS 3 & 4 showing overcurrent warnings. Triggering emergency load balancing protocol.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message 2 */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-green-700">BB</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium text-neutral-700">Bob The Builder</p>
                      <p className="text-xs text-neutral-500">09:22:45</p>
                    </div>
                    <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                      <p className="text-sm">Confirmed. Adding additional power capacity from reserve units. Will need to schedule maintenance window to address root cause.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message 3 */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-neutral-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-neutral-700">ME</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium text-neutral-700">You</p>
                      <p className="text-xs text-neutral-500">09:30:12</p>
                    </div>
                    <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                      <p className="text-sm">Has Facilities been notified? We need to ensure this doesn&apos;t impact the trading platform SLAs.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message 4 */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-700">AW</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium text-neutral-700">Alice Wonderland</p>
                      <p className="text-xs text-neutral-500">09:32:50</p>
                    </div>
                    <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                      <p className="text-sm">Yes, Facilities team responding. Current load balancing measures are keeping services operational. No impact to trading platforms expected.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message 5 */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-green-700">BB</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-medium text-neutral-700">Bob The Builder</p>
                      <p className="text-xs text-neutral-500">09:40:18</p>
                    </div>
                    <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                      <p className="text-sm">Update: Temporary power solution in place. Root cause appears to be unexpected load from new AI training cluster. Proposing emergency change request to relocate those workloads.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-neutral-200">
              <div className="mb-2">
                <Input 
                  placeholder="Type your message here..."
                  className="w-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="text-neutral-500 hover:text-neutral-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="text-neutral-500 hover:text-neutral-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <Button variant="primary">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal that doesn't close on overlay click */}
      <Modal
        isOpen={showNoOverlayCloseModal}
        onClose={() => setShowNoOverlayCloseModal(false)}
        title="Critical Infrastructure Alert"
        closeOnOverlayClick={false}
        footer={<Button onClick={() => setShowNoOverlayCloseModal(false)}>Acknowledge</Button>}
      >
        <p className="text-neutral-700">
          <span className="text-red-600 font-bold">URGENT:</span> Power distribution unit failure detected at Frankfurt Data Center (Zone 3). 
          Redundant systems activated. Estimated 4 hours until primary systems restored.
          Emergency response team has been dispatched.
        </p>
      </Modal>

      {/* Centered Modal */}
      <Modal
        isOpen={showCenteredModal}
        onClose={() => setShowCenteredModal(false)}
        title="Deployment Confirmation"
        size="sm"
        centered
      >
        <p className="text-neutral-700">
          Server rack <strong>NYC-COMP-B2145</strong> has been successfully deployed to production.
          Power and network connectivity verified. Monitoring systems active.
        </p>
      </Modal>
    </div>
  );
} 