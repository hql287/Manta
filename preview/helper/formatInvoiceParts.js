import { formatNumber } from '../../helpers/formatNumber';
import { getInvoiceValue } from '../../app/helpers/invoice';
import currencies from '../../libs/currencies.json';

function formatTaxValue(invoice, configs, t) {
	const currentLanguage = configs.language;
	const { tax } = invoice;
	const { code, placement, fraction, separator } = invoice.currency;
	const currencyBefore = placement === 'before';
	const currency = configs.useSymbol ? currencies[code].symbol : code;

	let taxValue = '';
	switch (tax.method) {
		case 'reverse':
			taxValue = t('form:fields:tax:reverse', {lng: currentLanguage});
			break;

		case 'default':
		case 'fixed':
		default:
			taxValue = formatNumber(getInvoiceValue(invoice).taxAmount, fraction, separator);
			taxValue = currencyBefore ? (currency + ' ' + taxValue) : (taxValue + ' ' + currency);
			break;
	}

	return taxValue;
}

function formatTaxDescription(invoice, configs, t) {
	const currentLanguage = configs.language;
	const { tax } = invoice;
	const { code, placement } = invoice.currency;
	const currencyBefore = placement === 'before';
	const currency = configs.useSymbol ? currencies[code].symbol : code;

	let taxString = '';
	switch (tax.method) {
		case 'fixed':
			taxString = currencyBefore ? (currency + ' ' + tax.amount) : (tax.amount + ' ' + currency);
			break;

		case 'default':
		default:
			taxString = tax.amount + '%';
			break;
	}

	return t('form:fields:tax:name', {lng: currentLanguage}) + " " + taxString;
}

export {
	formatTaxValue,
	formatTaxDescription
};