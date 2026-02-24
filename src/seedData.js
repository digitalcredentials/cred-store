
import testVC from './vc-templates/test-vc.js'

const categories = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Spring2026',
    description: 'Spring Convocation'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Fall2026',
    description: 'Fall Convocation'
  },
];

const holders = [
  {
    id: 'B21A0736-5F70-4251-B648-1551595DB051',
    name: 'James Chartrand',
    email: 'jc.chartrand@gmail.com',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:me',
    org_id: '1'
  },
  {
    id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    name: 'Taylor Tuna',
    email: 'taylor@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:tuna',
    org_id: '2'
  },
  {
    id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    name: 'Sam Salmon',
    email: 'sam@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:salmon',
    org_id: '3'
  },
  {
    id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    name: 'Charlie Crayfish',
    email: 'charlie@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:crayfish',
    org_id: '4'
  },
  {
    id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    name: 'Harper Haddock',
    email: 'harper@pacific.sea',
    org_id: '5'
  }
];


const templates = [
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    template_json: testVC,
    name: 'Bachelor of Engineering',
    description: 'Standard Bachelor of Engineering',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    template_json: testVC,
    name: 'Bachelor of Science',
    description: 'Standard Bachelor of Science',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    template_json: testVC,
    name: 'Bachelor of Arts',
    description: 'Standard Bachelor of Arts',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    template_json: testVC,
    name: 'Master of Science',
    description: 'Standard Master of Science',
    image_url: '/customers/evil-rabbit.png',
  }
];

const credentials = [
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'chartraj@mit.edu',
    status: 'collected',
    date_added: '2026-01-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    holder_email: 'chartraj@mit.edu',
    added_by: 'chartraj@mit.edu',
    status: 'collected',
    date_added: '2026-01-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
    holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    status: 'notified',
    date_added: '2026-01-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'someone@mit.edu',
    status: 'notified',
    date_added: '2026-01-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    id: 'CDEDCB59-39A0-43F7-A7A9-BE6BD30B1A46',
    category_id: categories[1].id,
    cred_name: "Master of Scientific",
    cred_template_id: templates[2].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    status: 'notified',
    date_added: '2025-12-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[3].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-12-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    date_added: '2025-12-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[1].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[3].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'test'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[3].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'test'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    date_added: '2025-08-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[0].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-11-24 14:30:00',
    tenant_name: 'test'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    date_added: '2025-11-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-11-24 14:30:00',
    tenant_name: 'testing'
  },
  {
    category_id: categories[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    date_added: '2025-11-24 14:30:00',
    tenant_name: 'test'
  }
];

const batches = [
  { name: 'Spring2026', description: '1st batch for spring convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu' },
  { name: 'Spring2025', description: '1st batch for spring convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu' },
  { name: 'Fall2025', description: '1st batch for fall convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu' }
];

export { credentials, batches, categories, templates, holders };
