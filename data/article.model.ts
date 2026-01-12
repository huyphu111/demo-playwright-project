export interface Article {
    id: number,
    title?: string,
    author?: string,
    date?: Date,
}

export const sampleArticleFashion : Article = {
    id: 11,
    title: "amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus",
    author: "Mark Jecno",
    date: new Date("25 Feb 2019")
}