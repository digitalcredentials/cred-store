import pool from './pool.js'

export const fetchAllCredentials = async () => {
    return await pool.query("select * from credential");
}

export const fetchBatches = async (limit) => {
    return await pool.query(`select id, name, description, added_by, date_added from batch${limit?' LIMIT ' + limit:''}`);
}

export const fetchAllTemplates = async () => {
    return await pool.query(`select * from template`);
}

export const fetchAllTenants = async () => {
    return await pool.query(`select * from tenant`);
}

const ITEMS_PER_PAGE = 6;

export const fetchTemplates = async (queryTerm) => {
  
    const templates = await pool.query(`SELECT * FROM template WHERE 
        name LIKE '%${queryTerm}%' OR
        description LIKE '%${queryTerm}%'
        `);
    const count = await fetchTemplateCount(queryTerm)
    return {templates,count}
}

const commonCredQuery = `SELECT 
        credential.id AS id,
        holder.id as holder_id,
        holder.name as holder_name,
        holder.email as holder_email,
        holder.did as holder_did,
        holder.org_id as holder_org_id,
        credential.cred_name as cred_name,
        credential.status as status, 
        credential.date_added as date_added,
        credential.cred_template_id,
        tenant.id as tenant_id,
        tenant.env_name as tenant_env_name,
        tenant.issuer_name as tenant_issuer_name,
        tenant.issuer_image_url as tenant_issuer_image_url,
        tenant.issuer_url as tenant_issuer_url,
        template.id as template_id,
        template.template_json as template_json,
        template.name as template_name,
        template.description as template_description,
        template.image_url as template_image_url
        FROM credential
        INNER JOIN holder ON credential.holder_id = holder.id
        INNER JOIN tenant ON credential.tenant_id = tenant.id
        INNER JOIN template ON credential.cred_template_id = template.id
        `

export const fetchCredentials = async (queryTerm, currentPage) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const credentials = await pool.query(`${commonCredQuery} WHERE 
        holder.name LIKE '%${queryTerm}%' OR
        credential.cred_name LIKE '%${queryTerm}%' OR
        holder.email LIKE '%${queryTerm}%' OR
        credential.status LIKE '%${queryTerm}%'
        ORDER BY credential.date_added DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `);
    const count = await fetchCredentialCount(queryTerm)
    return {credentials,count}
}

export const getTemplate = async id => {
    const result = await pool.query(`SELECT * FROM template WHERE id = ?`, [id]);
    const template = result[0]
    return template
}

export const getCredential = async id => {
  
    const result = await pool.query(`${commonCredQuery} WHERE credential.id = ?`, [id]);
    const credential = result[0]
    const holder = {
        id: credential.holder_id, 
        name: credential.holder_name, 
        did: credential.holder_did, 
        org_id: credential.holder_org_id, 
        email: credential.holder_email
    }

    const tenant = {
        id: credential.tenant_id,
        issuer_name: credential.tenant_issuer_name,
        issuer_url: credential.tenant_issuer_url,
        issuer_image_url: credential.tenant_issuer_image_url,
        env_name: credential.tenant_env_name
    }

    const template = {
        id: credential.template_id,
        template_json: credential.template_json,
        name: credential.template_name,
        description: credential.template_description,
        image_url: credential.template_image_url
    }

    delete credential.holder_id
    delete credential.holder_name
    delete credential.holder_did
    delete credential.holder_org_id
    delete credential.holder_email
    
    delete credential.tenant_id
    delete credential.tenant_issuer_name
    delete credential.tenant_issuer_url
    delete credential.tenant_issuer_image_url
    delete credential.tenant_env_name

    delete credential.template_id
    delete credential.template_name
    delete credential.template_description
    delete credential.template_image_url
    delete credential.template_json
    delete credential.cred_template_id


    return {credential, holder, tenant, template}
    
}

export const addBatch = async batch => {
   let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
   
    await addHolders(conn, batch.holders);
    await addCredentials(conn, batch.credentials);
    
    await conn.commit();
     console.log("Transaction successful!");
    
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Transaction failed:", err);
    throw err; 
  } finally {
    if (conn) return conn.release();
  }
}

export const checkForHolderDuplicates = async emailList => {
    const emailsAsStrings = emailList.map(email=>`'${email}'`).join(',')
    const query = `SELECT * FROM holder WHERE email IN (${emailsAsStrings})`;
    const result = await pool.query(query);
    return result
}

export const addHolders = async data => {
    const added_by = data.added_by
    const queryValues = data.holders.map(holder=>`('${holder.name}','${holder.did}','${holder.email}','${holder.org_id}', '${added_by}')`).join(',')
    const result = await pool.query(`insert into holder (name, did, email, org_id, added_by) values ${queryValues}`);
    return result;
}

export const addCredentials = async credentials => {
     // TODO, this is a batch so will need to add the batch info, ie., batch description (category???), templateId, csv file.
    const queryValues = credentials.map(credential=>`(${credential.cred_name},${credential.holder_id},${credential.cred_template_id},${credential.tenant_id},${credential.added_by})`).join(',')
    const result = await pool.query(`insert into credential (cred_name, holder_id, cred_template_id, tenant_id, added_by) values  ${queryValues}`);
     return result;
}

export const addCredential = async credential => {
    const result = await pool.query(`insert into credential (cred_name, holder_id, cred_template_id, tenant_id, added_by) values (?,?,?,?,?)`, [credential.cred_name, credential.holder_id, credential.cred_template_id, credential.tenant_id, credential.added_by]);
     return result;
}

export const updateCredential = async (id, credential) => {
    const result = await pool.query(`UPDATE credential
        SET cred_name = ?, 
        holder_id = ?,
        cred_template_id = ?,
        tenant_id = ?
        WHERE id = ?`, [credential.cred_name, credential.holder_id, credential.cred_template_id, credential.tenant_id, id]);
    return result;
}
  
export const fetchHolders = async (queryTerm, currentPage) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const holders = await pool.query(`SELECT * FROM holder WHERE 
        name LIKE '%${queryTerm}%' OR
        did LIKE '%${queryTerm}%' OR
        email LIKE '%${queryTerm}%' OR
        org_id LIKE '%${queryTerm}%'
        ORDER BY name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `);
    const count = await fetchHolderCount(queryTerm)
    return {holders,count}
}


export const fetchHolderCount = async (queryTerm) => {
    const result = await pool.query(`SELECT COUNT(*) as count FROM holder
        WHERE 
        name LIKE '%${queryTerm}%' OR
        did LIKE '%${queryTerm}%' OR
        email LIKE '%${queryTerm}%' OR
        org_id LIKE '%${queryTerm}%'
        `);
    const count = result[0].count.toString()
    return count
}

export const fetchCredentialsForHolder = async (holderId) => {

  const theQuery = `${commonCredQuery} WHERE 
        holder.id = '${holderId}'
        ORDER BY credential.date_added DESC
        `
    const credentials = await pool.query(theQuery);
    return credentials
}


export const fetchCredentialCountForHolder = async (orgId, queryTerm) => {
     const result = await pool.query(`SELECT COUNT(*) as count FROM credential
        INNER JOIN holder ON credential.holder_id = holder.id
        WHERE 
        holder.org_id = '${orgId}' AND 
        (
        holder.name LIKE '%${queryTerm}%' OR
        credential.cred_name LIKE '%${queryTerm}%' OR
        holder.email LIKE '%${queryTerm}%' OR
        credential.status LIKE '%${queryTerm}%'
        )
        `);
    const count = result[0].count.toString()
    return count
}

    

export const getHolder = async id => {
    const result = await pool.query(`SELECT * FROM holder WHERE id = ?`, [id]);
    return result[0]
}

export const addHolder = async data => {
    const result = await pool.query(`insert into holder (name, did, email, org_id, added_by) values (?,?,?,?,?)`, [data.holder.name, data.holder.did, data.holder.email, data.holder.org_id, data.added_by]);
     return result;
}

export const updateHolder = async (id, data) => {
    const result = await pool.query(`UPDATE holder
        SET name = ?, 
        did = ?,
        email = ?,
        org_id = ?,
        updated_by = ?
        WHERE id = ?`, [data.holder.name, data.holder.did, data.holder.email, data.holder.org_id, data.updated_by, id]);
    return result;
}

export const addPickup = async pickup => {
    const result = await pool.query(`INSERT INTO pickup (credential_id, template_id, pickup_token) VALUES (?,?,?) RETURNING id`, [pickup.credential_id, pickup.template_id, pickup.pickup_token]);
     return result[0];
}

export const lookupPickupToken = async pickupToken => {
    //we do the pickup lookup separately so that
    //we can show a different message if the token is good, but there are no creds for the holder 
    const tokenLookupResult = await pool.query(`SELECT * FROM notification WHERE pickup_token = ?`, [pickupToken]);
    const holderId = tokenLookupResult[0].holder_id;
    return fetchCredentialsForHolder(holderId)
}

export const addNotification = async notification => {
    const result = await pool.query(`INSERT INTO notification (credential_id, email, holder_id) VALUES (?,?,?) RETURNING pickup_token`, [notification.credential_id, notification.email, notification.holder_id]);
    return result[0];
}

export const fetchBatchesByQuery = async (queryTerm, currentPage = 1) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const batches = await pool.query(`SELECT id, name, description, added_by, date_added FROM batch WHERE 
        name LIKE '%${queryTerm}%' OR
        description LIKE '%${queryTerm}%' OR
        added_by LIKE '%${queryTerm}%' 
        ORDER BY date_added DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `);
    const count = await fetchBatchCountForQuery(queryTerm)
    return {batches,count}

}

export const fetchBatchCountForQuery = async (queryTerm) => {
    const result = await pool.query(`SELECT COUNT(*) as count FROM batch WHERE 
        name LIKE '%${queryTerm}%' OR
        description LIKE '%${queryTerm}%' OR
        added_by LIKE '%${queryTerm}%' 
        `);
    const count = result[0].count.toString()
    return count
}

export const fetchCredentialCount = async (queryTerm) => {
    const result = await pool.query(`SELECT COUNT(*) as count FROM credential
        INNER JOIN holder ON credential.holder_id = holder.id
        WHERE 
        holder.name LIKE '%${queryTerm}%' OR
        credential.cred_name LIKE '%${queryTerm}%' OR
        holder.email LIKE '%${queryTerm}%' OR
        credential.status LIKE '%${queryTerm}%'
        `);
    const count = result[0].count.toString()
    return count
}

export const fetchTemplateCount = async (queryTerm) => {
    const result = await pool.query(`SELECT COUNT(*) as count FROM template WHERE 
        name LIKE '%${queryTerm}%' OR
        description LIKE '%${queryTerm}%'
        `);
    const count = result[0].count.toString()
    return count
}




const convertToNumber = (count) => {
    return new Number(count.toString());
}

export const getReportData = async () => {
    const result = await Promise.all([
        pool.query("SELECT COUNT(*) AS total_credentials FROM credential"),
        pool.query("SELECT COUNT(*) AS total_templates FROM template"),
        pool.query("SELECT COUNT(*) AS total_batches FROM batch"),
        pool.query("SELECT status, COUNT(*) AS count FROM credential GROUP BY status;"),
        pool.query("SELECT YEAR(date_added) AS year, MONTH(date_added) AS month, COUNT(*) AS count FROM credential GROUP BY year, month ORDER BY year, month;")
    ]);
    const totalCredentials = result[0][0].total_credentials.toString();
    const totalTemplates = result[1][0].total_templates.toString();
    const totalBatches = result[2][0].total_batches.toString();
    const byStatus = result[3].reduce(
        (accumulator, statusObject) => {accumulator[statusObject.status] = convertToNumber(statusObject.count); return accumulator},
        {});
    const byMonth = result[4].map(row=>{row.count = convertToNumber(row.count); return row})
    return {totalCredentials, totalBatches, totalTemplates, byStatus, byMonth};
}



