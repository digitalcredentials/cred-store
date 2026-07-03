import testVC from './vc-templates/test-vc.js'

const tags = [
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
  {
    id: '3958dc9e-712f-4377-85e9-fec226a6442a',
    name: 'BostonMeeting2024',
    description: 'Conference attendance'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a9842a',
    name: 'DefltMeeting2025',
    description: 'Conference attendance'
  }
];

const holders = [
  {
    id: 'B21A0736-5F70-4251-B648-1551595DB051',
    name: 'James Chartrand',
    email: 'jc.chartrand@gmail.com',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:me',
    org_id: '1',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    name: 'Taylor Tuna',
    email: 'taylor@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:tuna',
    org_id: '2',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    name: 'Sam Salmon',
    email: 'sam@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:salmon',
    org_id: '3',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    name: 'Charlie Crayfish',
    email: 'charlie@pacific.sea',
    did: 'did:web:digitalcredentials.github.io:vc-test-fixtures:dids:crayfish',
    org_id: '4',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    name: 'Harper Haddock',
    email: 'harper@pacific.sea',
    org_id: '5',
    added_by: 'jc.chartrand@gmail.com'
  }
];

const tenants = [
  {
    id: '2366E51E-10D1-4EFD-9200-FCCD2A0452E8',
    name: 'Economics Department',
    email: 'jc.chartrand@gmail.com',
    description: 'Economics Department Signer',
    env_name: 'UN_PROTECTED_TEST',
    issuer_name: 'Wonderful U - Department of Economics',
    issuer_url: 'https://econ.wonderfulu.edu',
    issuer_image_url: 'https://digitalcredentials.github.io/badge-assets/classroom.png'
  },
  {
    id: '4A46FCEA-9634-43CB-ABD5-B293997FBFFF',
    name: 'Chemistry Department',
    email: 'jc.chartrand@gmail.com',
    description: 'Chemistry Department Signer',
    env_name: 'PROTECTED_TEST',
    issuer_name: 'Wonderful U - Department of Che istry',
    issuer_url: 'https://chem.wonderfulu.edu',
    issuer_image_url: 'https://digitalcredentials.github.io/badge-assets/classroom.png'
  },
  {
    id: '262F661C-4A25-4279-8474-0EB302D714BD',
    name: 'Continuing Education',
    email: 'jc.chartrand@gmail.com',
    description: 'Continuing Education Signer',
    env_name: 'RANDOMING_TESTING',
    issuer_name: 'Wonderful U - Continuing Education',
    issuer_url: 'https://con-ed.wonderfulu.edu',
    issuer_image_url: 'https://digitalcredentials.github.io/badge-assets/classroom.png'
  },
  {
    id: 'DAF9A925-B98D-4FA1-9008-0800FECB4FF1',
    name: 'Registrar',
    email: 'jc.chartrand@gmail.com',
    description: 'For signing miscellaneous registrarial documents,',
    env_name: 'TEST',
    issuer_name: 'Wonderful U - Registrar',
    issuer_url: 'https://registrar.wonderfulu.edu',
    issuer_image_url: 'https://digitalcredentials.github.io/badge-assets/classroom.png'
  },
  {
    id: '90A5CC2F-660F-47B6-918F-FA7064961CC8',
    name: 'Human Resources',
    email: 'jc.chartrand@gmail.com',
    desciption: 'For signing records of employment.',
    env_name: 'TESTING',
    issuer_name: 'Wonderful U - Human Resources',
    issuer_url: 'https://hr.wonderfulu.edu',
    issuer_image_url: 'https://digitalcredentials.github.io/badge-assets/classroom.png'
  }
];

const templates = [
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    template_json: testVC,
    name: 'Bachelor of Engineering',
    description: 'Standard Bachelor of Engineering',
		fields: [ 
			{
				id: 'specialization',
        type: 'string',
				pathIntoVC: 'credentialSubject.name',
				displayName: 'Specialization'
			}
		]
	},
	{
		id: 32,
		template_json: 'the VC itself',
		name: "Bachelors Degree",
		description: "a longer description of the bachelors",
    added_by: 'jc.chartrand@gmail.com',
		fields: [ 
			{
				id: 'specialization',
        type: 'string',
				pathIntoVC: 'credentialSubject.name',
				displayName: 'Specialization'
			},
			{
				id: 'degree',
				type: 'select',
				pathIntoVC: 'credentialSubject.achievement.achievementType',
				displayName: 'Degree Type',
				allowedValues: [ 
					{value: 'Bachelor of Arts', display: 'Bachelor of Arts'},
					{value: 'Bachelor of Science', display: 'Bachelor of Science'},
					{value: 'Bachelor of Engineering', display: 'Bachelor of Engineering'}
				]
			}
		]
	},
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    template_json: testVC,
    name: 'Bachelor of Science',
    description: 'Standard Bachelor of Science',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    template_json: testVC,
    name: 'Bachelor of Arts',
    description: 'Standard Bachelor of Arts',
    added_by: 'jc.chartrand@gmail.com'
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    template_json: testVC,
    name: 'Master of Science',
    description: 'Standard Master of Science',
    added_by: 'jc.chartrand@gmail.com'
  }
];

const credentials = [
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'chartraj@mit.edu',
    status: 'collectable',
    date_added: '2026-01-24 14:30:00',
    tenant_id: '2366E51E-10D1-4EFD-9200-FCCD2A0452E8',
    valid_from: '2020-03-08',
    valid_until: '2024-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    holder_email: 'chartraj@mit.edu',
    added_by: 'chartraj@mit.edu',
    status: 'collectable',
    date_added: '2026-01-24 14:30:00',
    tenant_id: '2366E51E-10D1-4EFD-9200-FCCD2A0452E8',
    valid_until: '2024-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
    holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    status: 'collectable',
    date_added: '2026-01-24 14:30:00',
    tenant_id: '2366E51E-10D1-4EFD-9200-FCCD2A0452E8',
    valid_from: '2020-03-08'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'someone@mit.edu',
    status: 'collectable',
    date_added: '2026-01-24 14:30:00',
    tenant_id: '2366E51E-10D1-4EFD-9200-FCCD2A0452E8',
    valid_from: '2020-03-08'
  },
  {
    id: 'cdedcb59-39a0-43f7-a7a9-be6bd30b1a46',
    tag_id: tags[1].id,
    cred_name: "Master of Scientific",
    cred_template_id: templates[2].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    status: 'collectable',
    date_added: '2025-12-24 14:30:00',
    tenant_id: '4A46FCEA-9634-43CB-ABD5-B293997FBFFF',
    valid_from: '2020-03-08',
    valid_until: '2024-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[3].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    status: 'collectable',
    date_added: '2025-12-24 14:30:00',
    tenant_id: '4A46FCEA-9634-43CB-ABD5-B293997FBFFF',
    valid_from: '2020-03-08',
    valid_until: '2024-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    status: 'hidden',
    date_added: '2025-12-24 14:30:00',
    tenant_id: '4A46FCEA-9634-43CB-ABD5-B293997FBFFF',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    status: 'hidden',
    date_added: '2025-08-24 14:30:00',
    tenant_id: '4A46FCEA-9634-43CB-ABD5-B293997FBFFF',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[1].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    status: 'hidden',
    date_added: '2025-08-24 14:30:00',
    tenant_id: '262F661C-4A25-4279-8474-0EB302D714BD',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[3].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-08-24 14:30:00',
    status: 'hidden',
    tenant_id: '262F661C-4A25-4279-8474-0EB302D714BD',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[3].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    status: 'hidden',
    date_added: '2025-08-24 14:30:00',
    tenant_id: '262F661C-4A25-4279-8474-0EB302D714BD',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[1].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    status: 'hidden',
    date_added: '2025-08-24 14:30:00',
    tenant_id: '262F661C-4A25-4279-8474-0EB302D714BD',

  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    date_added: '2025-08-24 14:30:00',
    status: 'collectable',
    tenant_id: 'DAF9A925-B98D-4FA1-9008-0800FECB4FF1',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[0].id,
     holder_id: '73BEFADD-0BA4-418E-9141-0DCDBDE98776',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-11-24 14:30:00',
    status: 'collectable',
    tenant_id: 'DAF9A925-B98D-4FA1-9008-0800FECB4FF1',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[2].id,
     holder_id: 'C74643D6-6771-4510-B3BC-9442DAED936D',
    added_by: 'someone@mit.edu',
    date_added: '2025-11-24 14:30:00',
    status: 'collectable',
    tenant_id: 'DAF9A925-B98D-4FA1-9008-0800FECB4FF1',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[0].id,
    cred_name: "Bachelor of Arts",
    cred_template_id: templates[2].id,
    holder_id: 'F9D0AAF4-E535-4B8C-84A2-7B627DF21031',
    added_by: 'chartraj@mit.edu',
    date_added: '2025-11-24 14:30:00',
    status: 'collectable',
    tenant_id: '90A5CC2F-660F-47B6-918F-FA7064961CC8',
    valid_until: '2028-03-09'
  },
  {
    tag_id: tags[1].id,
    cred_name: "Master of Science",
    cred_template_id: templates[0].id,
    holder_id: 'B21A0736-5F70-4251-B648-1551595DB051',
    added_by: 'someone@mit.edu',
    status: 'collectable',
    date_added: '2025-11-24 14:30:00',
    tenant_id: '90A5CC2F-660F-47B6-918F-FA7064961CC8',
    valid_from: '2020-03-08',
    valid_until: '2028-03-09'
  }
];

const batches = [
  { name: 'Spring2026', description: '1st batch for spring convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu', template_id: templates[0].id, tenant_id: tenants[0].id, status: 'pending', tag_id: tags[0].id, valid_from: '2020-03-08', valid_until: '2026-09-09' },
  { name: 'Spring2025', description: '1st batch for spring convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu', template_id: templates[0].id, tenant_id: tenants[0].id, status: 'pending', tag_id: tags[0].id, valid_from: '2020-03-08', valid_until: '2028-03-09' },
  { name: 'Fall2025', description: '1st batch for fall convocation', uploaded_csv: 'csv data', added_by: 'chartraj@mit.edu', template_id: templates[1].id, tenant_id: tenants[0].id, status: 'pending', tag_id: tags[1].id, valid_from: '2020-03-08', valid_until: '2027-03-09' },
];

export { credentials, batches, tags, templates, holders, tenants };
