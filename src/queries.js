import pool from './pool.js'

export const fetchAllCredentials = async () => {
    return await pool.query("select * from credential");
}

export const fetchBatches = async (limit) => {
    return await pool.query(`select id, name, description, added_by, date_added from batch${limit?' LIMIT ' + limit:''}`);
}

export const fetchAllTemplates = async (query) => {
    return await pool.query(`select * from template`);
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
        holder.name as holder_name,
        holder.email as holder_email,
        credential.cred_name as cred_name,
        credential.status as status, 
        credential.date_added as date_added
        FROM credential
        INNER JOIN holder ON credential.holder_id = holder.id
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
        {}
    );

//(row=>{row.count = row.count.toString(); return row})

    const byMonth = result[4].map(row=>{row.count = convertToNumber(row.count); return row})
    return {totalCredentials, totalBatches, totalTemplates, byStatus, byMonth};
}

export const getCredential = async id => {
    const result = await pool.query(`${commonCredQuery} WHERE 
     credential.id = ?`, [id]);
    return result[0]
}

export const addCredential = async credential => {
    const result = await pool.query(`insert into credential (cred_name, holder_name, holder_email, added_by) values (?,?,?,?)`, [credential.cred_name, credential.holder_name, credential.holder_email, credential.added_by]);
     return result;
}

export const updateCredential = async (id, credential) => {
    const result = await pool.query(`UPDATE credential
        SET cred_name = ?, 
        holder_name = ?,
        holder_email = ?
        WHERE id = ?`, [credential.cred_name, credential.holder_name, credential.holder_email, id]);
    return result;
}

