import { env } from './env.js';
import { randomBytes } from 'node:crypto';

export function licensesCol() {
	return env('APPWRITE_COLLECTION_LICENSES', 'ags_licenses');
}

export function ordersCol() {
	return env('APPWRITE_COLLECTION_ORDERS', 'ags_orders');
}

export function customersCol() {
	return env('APPWRITE_COLLECTION_CUSTOMERS', 'ags_customers');
}

export async function upsertLicense(databases, dbId, doc) {
	const col = licensesCol();
	try {
		await databases.createDocument(dbId, col, doc.keyId, doc);
	} catch {
		await databases.updateDocument(dbId, col, doc.keyId, doc);
	}
}

export async function createOrder(databases, dbId, doc) {
	const col = ordersCol();
	const id = `ord_${randomBytes(8).toString('hex')}`;
	await databases.createDocument(dbId, col, id, doc);
	return id;
}

export async function updateOrder(databases, dbId, orderId, patch) {
	await databases.updateDocument(dbId, ordersCol(), orderId, {
		...patch,
		updatedAt: new Date().toISOString()
	});
}

export async function getLicense(databases, dbId, keyId) {
	return databases.getDocument(dbId, licensesCol(), keyId);
}

export async function listLicensesByEmail(databases, dbId, email) {
	const { Query } = await import('node-appwrite');
	const res = await databases.listDocuments(dbId, licensesCol(), [
		Query.equal('email', email.toLowerCase()),
		Query.limit(25)
	]);
	return res.documents || [];
}

export async function upsertCustomer(databases, dbId, email, patch = {}) {
	const col = customersCol();
	const id = email.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 36) || `cust_${randomBytes(6).toString('hex')}`;
	const now = new Date().toISOString();
	const doc = {
		email: email.toLowerCase(),
		updatedAt: now,
		...patch
	};
	try {
		await databases.createDocument(dbId, col, id, { ...doc, createdAt: now });
	} catch {
		await databases.updateDocument(dbId, col, id, doc);
	}
	return id;
}
