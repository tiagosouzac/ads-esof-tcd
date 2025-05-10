export function buildUrl(...parts: string[]): string {
	return parts.map(removeTrailingSeparator).filter(Boolean).join('/');

	function removeTrailingSeparator(part: string): string {
		return part.replace(/^\/|\/$/g, '');
	}
}
