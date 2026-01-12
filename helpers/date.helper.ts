
// Use to parse dates in "DD MMM YYYY" format, e.g., "25 Dec 2023"
export async function parseCustomDate(dateString: string): Promise<Date> {
    const [day, monthStr, year] = dateString.split(" ");

    const months: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
    };

    if (!months.hasOwnProperty(monthStr)) {
        throw new Error(`Invalid month: ${monthStr}`);
    }

    return new Date(
        Number(year),
        months[monthStr],
        Number(day)
    );
}