/**
 * @typedef {'income'|'expense'} TransactionType
 *
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {TransactionType} type
 * @property {number} amount
 * @property {string} categoryId
 * @property {string} note
 * @property {string} date
 *
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 *
 * @typedef {Object} BudgetTarget
 * @property {string} id
 * @property {string} monthKey
 * @property {string} categoryId
 * @property {number} limit
 *
 * @typedef {Object} Month
 * @property {string} key
 * @property {number} year
 * @property {number} month
 */

export const ModelDocs = {}
