export const truncateAddress = (address: string, truncationLength = 6) => {
	const truncatedAddress = address?.slice(0, truncationLength) + "..." + address?.slice(-truncationLength);
	return truncatedAddress;
}